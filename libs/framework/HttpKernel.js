import Service from './services/Service'
import Router from './libs/KoaRouterWrapper'

const Koa = require('koa');

export default class HttpKernel extends Service {
    config_key = 'http';
    lifecycle = 'app';

    constructor() {
        super();

        this.http = new Koa();

        this.http.use(async (ctx, next) => {
            try {
                await next();
                await this.onNotFound(ctx);
            } catch (e) {
                await this.onError(ctx, e);
            }
        });

        this.initMiddleWares();
    }


    listen() {
        this.http.listen(this.config.port);
        console.log('listening on: http://localhost:' + this.config.port)
    }


    setupRouter(prefix, routesFn, name = null) {
        const router = new Router({prefix: '/' + prefix});
        if (!name)
            name = prefix;

        router.router.use(async (ctx, next) => {
            ctx['router_type'] = name;
            await next()
        });

        routesFn(router);
        this.http.use(router.router.routes());
        this.http.use(router.router.allowedMethods());
    }

}

