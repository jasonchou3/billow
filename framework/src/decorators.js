import Context from './Context'

export const inject = (...serviceAliases) => {
    return function (target, key, descriptor) {
        const method = descriptor.value;

        descriptor.value = (...args) => {

            const service = [];
            serviceAliases.map(serviceAlias => {
                service.push(Context.app.service(serviceAlias))
            });

            args.splice(0, 0, service);
            return method.apply(target, args)
        };

        return descriptor;
    }
};

/**
 * 未认证会拦截请求
 * @param guard_name
 * @returns {Function}
 */
export const isAuthenticated = (guard_name = null) => {
    return function (target, key, descriptor) {
        const method = descriptor.value;

        descriptor.value = async (ctx) => {
            if (guard_name) {
                await ctx.auth.getGuard(guard_name).isAuthenticated(true);
            } else
                await ctx.auth.isAuthenticated(true);

            return method.apply(target, [ctx])
        };

        return descriptor;
    }
};