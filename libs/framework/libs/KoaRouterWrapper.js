import Context from '../Context'

const Router = require('koa-router');

export default class KoaRouterWrapper extends Context {
    constructor(opts) {
        super();
        this.router = new Router(opts);
    }

    use() {
        const argArr = Array.prototype.slice.apply(arguments);

        let controllerPath = argArr[argArr.length - 1];
        const controllerClazz = require(this.app.controllerPath + '/' + controllerPath).default;

        ['get', 'post', 'put', 'delete'].map(method => {
            if (controllerClazz.prototype[method]) {
                this[method](...argArr);
            }
        });
    }

    get() {
        const argArr = Array.prototype.slice.apply(arguments);
        this.add('get', ...argArr);
    }

    post() {
        const argArr = Array.prototype.slice.apply(arguments);
        this.add('post', ...argArr);
    }

    put() {
        const argArr = Array.prototype.slice.apply(arguments);
        this.add('put', ...argArr);
    }

    delete() {
        const argArr = Array.prototype.slice.apply(arguments);
        this.add('put', ...argArr);
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