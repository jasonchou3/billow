export default (Super) => class ServiceContainer extends Super {
    // ==================== service =========================

    alias_instances = {};

    /**
     * 不存在创建，存在返回服务对象
     * @param alias
     * @param args array
     */
    service(alias, args = []) {
        if (!this.alias_instances[alias]) {

            return this.make(alias, args);
        }

        return this.alias_instances[alias];
    }

    /**
     * 是否存在服务对象
     * @param alias
     * @returns {*}
     */
    hasService(alias) {
        return this.alias_instances[alias];
    }

    hasAlias(alias) {
        return !!this.config['app']['alias'][alias];
    }

    make(alias, args = []) {
        let clazz = this.config['app']['alias'][alias];
        if (typeof(clazz) === 'string') {
            clazz = require(this.project_root_path + '/' + clazz).default
        }

        const instance = new clazz(...args);

        if (instance.lifecycle === 'app')
            this.alias_instances[alias] = instance;
        // else if (instance.lifecycle === 'request')

        return instance;
    }

    registerAlias(alias, clazz) {
        if (this.config['app']['alias'][alias])
            throw new Error(`alias:${alias}已存在！`);

        this.config['app']['alias'][alias] = clazz;
    }
}