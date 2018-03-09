import _ from 'lodash';
import validator from 'validator';
import { getParams } from '../../util';
import accountService from '../../Services/accountService';

export default async function (ctx, next) {
  const { _id, code } = getParams(ctx);
  if (_.isNil(_id) || _.isNil(code)) throw new Error('Invalidate params.');

  const service = new accountService();

  await service.verify2fa({ _id, code });

  return { msg: 'Hello World!' };
}
