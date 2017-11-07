const favicon = require('koa-favicon')();
const convert = require('koa-convert');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger')();

import HttpKernel from '../../libs/framework/HttpKernel'

import api_routes from './api_routes'
import web_routes from './web_routes'

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
            res.router_type = ctx.router_type;
            res.msg = e.message;
            res.stack = e.stack;
        }

        ctx.body = res;
    }
}

