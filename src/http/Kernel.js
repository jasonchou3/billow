import HttpKernel from '../../libs/framework/HttpKernel'
import KoaRouterWrapper from '../../libs/framework/libs/KoaRouterWrapper'

const Koa = require('koa');
const favicon = require('koa-favicon')();
const convert = require('koa-convert');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger')();


export default class Kernel extends HttpKernel {

    constructor() {
        super();

        this.http = new Koa();

        const middlewares = [
            favicon, //拦截fav请求
            bodyparser,
            logger
        ];

        this.http.use(async (ctx, next) => {
            try {
                console.log(1);
                await next();
                await this.onNotFound(ctx);
            } catch (e) {
                await this.onError(ctx, e);
            }
        });

        this.http.use(convert.compose(middlewares));
        this.router = new KoaRouterWrapper();
    }

    async onNotFound(ctx) {
        if (!ctx.body)
            ctx.body = {code: 404, msg: 'not found'};
    }

    async onError(ctx, e) {

        const res = {code: 500, msg: '系统异常'};

        if (this.app.debug) {
            res.debug = true;
            res.msg = e.message;
            res.stack = e.stack;
        }

        ctx.body = res;
    }


    onListen() {
        this.http.listen(this.config.port);
    }

    setup() {
        this.http.use(this.router.router.routes());
        this.http.use(this.router.router.allowedMethods());
    }
}

