export default (Super) => class ServiceContainer extends Super {

    serviceSingleInstances = {}; //key : alias, value : serviceInstance

    aliasMap = {}; //key : alias , value : ServiceClass

    aliasImplementationMap = {}; //key : alias , value : ServiceClass

    initAliases() {
        for (let [alias, ServiceClass] of Object.entries(this.config['app']['alias'])) {
            this.registerAlias(alias, ServiceClass);
        }
    }

    /**
     * 不存在创建，存在返回服务对象
     * @param alias
     * @param args array
     */
    service(alias, args = []) {
        if (!this.serviceSingleInstances[alias]) {

            return this.make(alias, args);
        }

        return this.serviceSingleInstances[alias];
    }

    /**
     * 是否存在服务对象
     * @param alias
     * @returns {*}
     */
    hasService(alias) {
        return this.serviceSingleInstances[alias];
    }

    hasAlias(alias) {
        return !!this.aliasMap[alias];
    }

    make(alias, args = []) {
        let serviceClassPath = this.aliasMap[alias];
        let serviceClass;
        if (typeof(serviceClassPath) === 'string') {
            serviceClass = this.requireClassFromConfig(serviceClassPath);
        } else
            serviceClass = serviceClassPath;

        const instance = new serviceClass(...args);

        if (instance.single)
            this.serviceSingleInstances[alias] = instance;

        return instance;
    }

    /**
     * 为一个服务注册别名
     * @param alias
     * @param ServiceClass
     */
    registerAlias(alias, ServiceClass) {
        this.aliasMap[alias] = ServiceClass;
    }

    /**
     *
     * @param alias
     * @param key
     * @param ServiceClass
     */
    registerAliasImplementation(alias, key, ServiceClass) {

        if (!this.aliasImplementationMap[alias]) {
            this.aliasImplementationMap[alias] = {}
        }

        this.aliasImplementationMap[alias][key] = ServiceClass;
    }

    switchAliasImplementation(alias, key) {
        if (this.aliasImplementationMap[alias]) {
            const ServiceClass = this.aliasImplementationMap[alias][key];

            if (ServiceClass) {
                this.registerAlias(alias, ServiceClass)
                return
            }
        }

        throw new Error(`没有service ${alias} 的实现 ${key}`);
    }


}