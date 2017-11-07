import Service from './services/Service'
import Router from './libs/KoaRouterWrapper'

const https = require('https');
const Koa = require('koa');
const fs = require('fs');

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


    async listen() {
        const cb = (err) => {
            console.log('\nlistening on: http://localhost:' + this.config.port)
        };


        if (this.config.https) {
            const credentials = {
                key: fs.readFileSync(this.config.credentials.key, 'utf8'),
                cert: fs.readFileSync(this.config.credentials.cert, 'utf8')
            };

            https.createServer(credentials, this.http.callback()).listen(this.config.port, cb);
        } else
            this.http.listen(this.config.port, cb);
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

