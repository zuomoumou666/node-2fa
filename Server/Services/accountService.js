import _ from 'lodash';
import crypto from 'crypto';
import User from '../Models/user';
import config from '../config';

const { tfaOpts } = config;

export default class {
  constructor() {

  }

  async userExist(username) {
    let user = await this.findOneUserByName(username);
    return user;
  };

  async findOneUserByName(username) {
    let user = await User.find({ username });
    return user[0];
  };

  async creatUser({ username, psw }) {
    let date = new Date();
    let user = new User({
      username,
      psw,
      createTime: date,
      lastChangeTime: date,
    });
    return user.save();
  };

  async request2Fa(user) {
    let tfa = user.tfa || {};
    let code = '';
    let error = null;
    if (tfa.lastRequestTime && Date.now() - tfa.lastRequestTime < tfaOpts.minRequestInterval) {
      error = 'Request too soon.';
    }

    for (let i = 0; i < tfaOpts.pswLen; i++) {
      code += Math.floor(Math.random() * 10).toString();
    }

    if (error) {
      tfa.lastAttemptsTime = new Date();
    } else {
      tfa.salt = crypto.randomBytes(128).toString('hex');
      tfa.code = crypto.pbkdf2Sync(code, tfa.salt, 1, 128, 'sha512').toString('hex');
      tfa.lastRequestTime = Date.now();
      tfa.attempts = 0;
      tfa.lastAttemptsTime = tfa.lastAttemptsTime || 0;
    }
    user.tfa = tfa;

    return user.save().then(() => {
      if (error) throw new Error(error);
      return code;
    });
  };
  async findOneUserById(_id) {
    let user = await User.find({ _id });
    return user[0];
  }

  async verify2fa({ _id, code }) {
    const user = await this.findOneUserById(_id);
    const tfa = user.tfa;
    let error = null;

    if (!tfa || !tfa.salt || !tfa.code) {
      error = 'Code not send.';
    } else if (tfa.lastRequestTime && Date.now() - tfa.lastRequestTime > tfaOpts.expiration) {
      error = 'Two Factor password expired, please resend.';
    } else if (tfa.lastAttemptsTime && Date.now() - tfa.lastAttemptsTime < tfaOpts.minAttemptInterval) {
      error = 'Two Factor password attempts too soon.';
    } else if (tfa.attempts >= tfaOpts.maxAttempts) {
      error = 'Account locked due to too many failed login attempts.Please login again.';
    }

    const _code = crypto.pbkdf2Sync(code, tfa.salt, 1, 128, 'sha512').toString('hex');

    tfa.lastAttemptsTime = Date.now();

    if (!error) {
      if (_code !== tfa.code) {
        error = 'Two Factor password is wrong.';
        tfa.attempts++;
      } else {
        tfa.attempts = 0;
        tfa.code = '';
        tfa.salt = '';
      }
    } else {
      tfa.attempts++;
    }

    user.tfa = tfa;

    return user.save().then((newUser) => {
      if (error) throw new Error(error);
      return newUser;
    });
  }
}