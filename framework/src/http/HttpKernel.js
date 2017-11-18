import Kernel from '../Kernel'
import Router from './KoaRouterWrapper'

const https = require('https');
const Koa = require('koa');
const fs = require('fs');

export default class HttpKernel extends Kernel {
    config_key = 'http';
    single = true;

    constructor() {
        super();

        this.http = new Koa();

        this.http.use(async (ctx, next) => {
            try {
                await next();
                if (!ctx.body)
                    await this.onNotFound(ctx);
            } catch (e) {
                await this.onError(ctx, e);
            }
        });

        this.initMiddleWares();
    }


    async listen() {
        const cb = (err) => {
            console.log(`\nlistening on: ${this.config.https ? 'https' : 'http'}://localhost:${ this.config.port}`)
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


    setupRouter(prefix, middlewares = [], routesFn, name = null) {
        const router = new Router({prefix: '/' + prefix});
        if (!name)
            name = prefix;

        middlewares.splice(0, 0, async (ctx, next) => {
            ctx['routerName'] = name;
            await next()
        });

        router.router.use(middlewares);

        routesFn(router);
        this.http.use(router.router.routes());
        this.http.use(router.router.allowedMethods());
    }
}

