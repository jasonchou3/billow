const favicon = require('koa-favicon')();
const convert = require('koa-convert');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger')();

import HttpKernel from '../../../libs/framework/http/HttpKernel'

import api_routes from './routes/api'
import web_routes from './routes/web'

export default class Kernel extends HttpKernel {

    initMiddleWares() {
        const middlewares = [
            favicon, //拦截fav请求
            bodyparser,
            logger
        ];

        this.http.use(convert.compose(middlewares));


        this.setupRouter('api', api_routes);
        // this.setupRouter('web', web_routes);
    }

    async onNotFound(ctx) {
        if (!ctx.body)
            ctx.body = {code: 404, msg: 'Not Found'};
    }

    async onError(ctx, e) {
        const res = {code: 500, msg: 'Internal Server Error'};

        if (this.app.debug) {
            res.debug = true;
            res.router_name = ctx.router_name;
            res.msg = e.message;
            res.stack = e.stackList()
        }

        ctx.body = res;
    }
}

