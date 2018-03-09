import _ from 'lodash';
import validator from 'validator';
import { getParams, sendEmail, } from '../../util';
import accountService from '../../Services/accountService';

export default async function (ctx, next) {
  const { username, psw } = getParams(ctx);
  if (_.isNil(username) || _.isNil(psw) || !validator.isEmail(username)) throw new Error('Invalidate params.');

  // validated psw.
  const service = new accountService();
  const user = await service.findOneUserByName(username);
  if (!user) throw new Error('User not exist.');
  if (user.psw !== psw) throw new Error('Password mistake.');

  // get one-time-password.
  const code = await service.request2Fa(user);
  console.log(code);
  // post email.
  let result = await sendEmail({ code, email: user.username, });
  // console.log('mail', result);

  return { _id: user._id };
}
