import Context from '../Context'

const Router = require('koa-router');

export default class KoaRouterWrapper extends Context {
    constructor(opts) {
        super();
        this.router = new Router(opts);
    }

    use() {
        let controllerPath = arguments[arguments.length - 1];
        const controllerClazz = require(this.app.controllerPath + '/' + controllerPath.split('@')[0]).default;

        ['get', 'post', 'put', 'delete'].map(method => {
            if (controllerClazz.prototype[method]) {
                this[method](...arguments);
            }
        });
    }

    get() {
        this.add('get', ...arguments);
    }

    post() {
        this.add('post', ...arguments);
    }

    put() {
        this.add('put', ...arguments);
    }

    delete() {
        this.add('put', ...arguments);
    }

    add() {
        let argArr = Array.prototype.slice.apply(arguments);
        const method = argArr[0];

        argArr = argArr.splice(1, argArr.length);

        let controllerAndAction = argArr[argArr.length - 1];

        let temp = controllerAndAction.split('@');

        let controllerPath = temp[0];
        let action;
        if (temp.length === 2) {
            action = temp[1]
        } else {
            action = method;
        }

        const controllerClazz = require(this.app.controllerPath + '/' + controllerPath).default;

        if (controllerClazz.prototype[action]) {
            if (this.app.debug)
                console.log(method, ...argArr);

            argArr[argArr.length - 1] = async (ctx) => {
                const i = new controllerClazz(ctx);
                await i.handle(ctx);
                await i[action](ctx);
            };

            this.router[method](...argArr);
        } else {
            throw new Error(`action:${action} 不存在! ${method} ${argArr}`,)
        }
    }
}