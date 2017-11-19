const favicon = require('koa-favicon')();
const convert = require('koa-convert');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger')();

import HttpKernel from '../../../framework/src/http/HttpKernel'
import auth from '../../../framework/src/auth/middlewares/auth'
import session from '../../../framework/src/session/middlewares/session'

import api_routes from './routes/api'
import web_routes from './routes/web'

export default class Kernel extends HttpKernel {

    initMiddleWares() {
        const middlewares = [
            favicon, //拦截fav请求
            bodyparser,
            logger,
            session,
            auth
        ];

        this.http.use(convert.compose(middlewares));


        this.setupRouter('api', [], api_routes);
        // this.setupRouter('web',[], web_routes);
    }

    async onNotFound(ctx) {
        ctx.body = {status: 404, msg: 'Not Found'};
    }

    async onError(ctx, e) {
        // if (ctx.routerName === 'api') {
        let status, msg;
        if (e.name === 'authenticate_failed') {
            status = 401;
            msg = 'Unauthorized';
        } else {
            status = 500;
            msg = 'Internal Server Error';
        }

        const res = {status, msg};

        if (this.app.debug) {
            res.debug = true;
            res.routerName = ctx.routerName;
            res.stack = e.stackList()
        }

        ctx.status = status;
        ctx.body = res;
    }

    // }
}
