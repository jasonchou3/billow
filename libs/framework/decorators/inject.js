import Context from '../Context'

export default (...serviceAliases) => {
    return function (target, key, descriptor) {
        const method = descriptor.value;

        descriptor.value = (...args) => {
            const service = [];
            serviceAliases.map(serviceAlias => {
                service.push(Context.app.get(serviceAlias))
            });

            args.splice(0, 0, service);
            return method.apply(target, args)
        };

        return descriptor;
    }
}