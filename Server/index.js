import Koa from 'koa';
import registerRouter from './router';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import mongoService from './Services/mongoService';
import config from './config';
const mongo = new mongoService;
mongo.initDB();

const app = new Koa();
const PORT = config.serverConfig.port || 9999;


app.use(bodyParser());
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});
app.use(serve('./Public'));

registerRouter(app);

app.listen(PORT);


console.log(`app started at port ${PORT}...`);
