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

    async isAuthenticated() {
        if (!this.userId)
            return false;

        const modelClass = this.getModelClass();
        const user = await modelClass.findById(this.userId);

        if (user) {
            if (!user['isValid']) {
                throw new Error(`${this.constructor.name} 指定model: ${modelClass.modelName} 未实现 isValid 方法`);
            }

            return user['isValid']();
        }

        return false;
    }

    // parseUserId() {
    //需实现
    // }
}