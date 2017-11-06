import HttpKernel from '../../libs/framework/HttpKernel'
import RouterWrapper from '../../libs/RouterWrapper'

const Koa = require('koa');
const Router = require('koa-router');
const router = new Router();

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

        this.http.use(convert.compose(middlewares));
        // this.http.use((ctx) => {
        //     ctx.body = 'hello, jaravel';
        // });
    }

    onListen() {
        this.http.listen(this.config.port);
    }


    getRouter() {
        return new RouterWrapper(this.app.controllerPath,router);
    }

    setup() {
        this.http.use(router.routes());
        this.http.use(router.allowedMethods());
    }
}

