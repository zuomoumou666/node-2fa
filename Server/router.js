import Router from 'koa-router';
import registerCtrl from './Controllers/account/register';
import loginCtrl from './Controllers/account/login';
import verifyCtrl from './Controllers/account/verify';
import { rtCode } from './const';

const router = new Router();

const addRouter = (path, method, controller) => {
  return router[method](path, async (ctx, next) => {
    try {
      let result = await controller(ctx, next);
      ctx.body = {
        code: rtCode.success,
        data: result,
      }
    } catch (e) {
      console.log(e);
      ctx.body = {
        code: rtCode.badRequest,
        msg: e.message,
      }
    }
    return await next();
  });
}


router
  .get('/', async (ctx, next) => {
    ctx.redirect('/index.html');
    await next();
  })
  .get('/index', async (ctx, next) => {
    ctx.redirect('/index.html');
    await next();
  });

addRouter('/register', 'post', registerCtrl);
addRouter('/login', 'post', loginCtrl);
addRouter('/verify', 'post', verifyCtrl);


export default function registerRouter(app) {
  app.use(router.routes());
}
