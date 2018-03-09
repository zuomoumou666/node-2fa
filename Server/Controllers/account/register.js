import _ from 'lodash';
import validator from 'validator';
import { getParams } from '../../util';
import accountService from '../../Services/accountService';

export default async function (ctx, next) {
  const { username, psw } = getParams(ctx);
  if (_.isNil(username) || _.isNil(psw) || !validator.isEmail(username)) throw new Error('Invalidate params.');

  const service = new accountService();
  const userExist = await service.userExist(username);
  if(userExist) throw new Error('User has exist.');
  
  let result = await service.creatUser({ username, psw });
  return { _id: result._id };
}
