import Context from "../../Context";

export default class Guard extends Context {
    static _modelClassCache = {};

    user;
    userId;

    constructor(ctx, modelClass, config) {
        super();
        this.modelClass = modelClass;
        this.ctx = ctx;
        this.config = config;
    }

    getModelClass() {
        if (!this.constructor._modelClassCache[this.modelClass]) {
            this.constructor._modelClassCache[this.modelClass] = require(this.app.modelPath + '/' + this.modelClass).default;
        }

        return this.constructor._modelClassCache[this.modelClass];
    }

    authenticate() {
        const modelClass = this.getModelClass();

        if (!modelClass['authenticate'])
            throw new Error(`${this.constructor.name} 指定model: ${modelClass.modelName} 未实现 authenticate 静态方法`);

        return modelClass['authenticate'](...arguments)
    }

    async isAuthenticated(crash = true) {
        const user = await this.getUser();
        if (user) {
            if (!user['isValid']) {
                const modelClass = this.getModelClass();
                throw new Error(`${this.constructor.name} 指定model: ${modelClass.modelName} 未实现 isValid 方法`);
            }

            const succ = user['isValid']();


            if (succ)
                return true;
        }

        if (crash)
            this.throwAuthenticateFailed();
        return false;
    }


    async getUser() {
        if (this.user)
            return this.user;

        if (!this.userId) {
            return null;
        }

        const modelClass = this.getModelClass();
        const user = await modelClass.findById(this.userId);
        this.user = user;

        return user;
    }

    throwAuthenticateFailed() {
        const err = new Error('authenticate failed');
        err.name = 'authenticate_failed';
        throw err
    }


    getUserId() {
        return this.userId;
    }
}