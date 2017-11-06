export default (Super) => class ServiceContainer extends Super {
    // ==================== service =========================

    alias_instances = {};

    /**
     *
     * @param alias
     * @param args array
     */
    get(alias, args = []) {
        if (!this.alias_instances[alias]) {

            return this.make(alias, args);
        }

        return this.alias_instances[alias];
    }

    make(alias, args = []) {
        const clazz = this.config['app']['alias'][alias];
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