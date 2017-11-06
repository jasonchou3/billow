import HttpKernel from '../../libs/framework/HttpKernel'

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
        return {
            app: this.app,
            use() {
                const argArr = Array.prototype.slice.apply(arguments);

                let controllerPath = argArr[argArr.length - 1];
                const controllerClazz = require(this.app.controllerPath + '/' + controllerPath).default;

                // ['get', 'post', 'put', 'delete'].map(method => {
                //
                // })

                argArr[argArr.length - 1] = async (ctx) => {
                    const i = new controllerClazz(ctx);
                    const action = i[ctx.method.toLowerCase()];
                    if (action) {
                        await i.handle(ctx);
                        action(ctx)
                    }
                };

                router.all(...argArr);
            }

        };
    }

    setup() {
        this.http.use(router.routes());
        this.http.use(router.allowedMethods());
    }
}

