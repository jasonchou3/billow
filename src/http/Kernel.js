import HttpKernel from '../../libs/framework/HttpKernel'

const favicon = require('koa-favicon')();
const convert = require('koa-convert');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger')();


export default class Kernel extends HttpKernel {

    init() {
        const middlewares = [
            favicon, //拦截fav请求
            bodyparser,
            logger
        ];

        this.http.use(convert.compose(middlewares));

        this.http.use((ctx) => {
            ctx.body = 'hello, jaravel';
        })
    }
}
