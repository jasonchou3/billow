import Service from '../services/Service'
import MemoryCache from './driver/MemoryCache'
import RedisCache from './driver/RedisCache'

const driverMap = {
    redis: RedisCache,
    memory: MemoryCache,
};

export default class CacheManager extends Service {
    lifecycle = 'app';
    config_key = 'cache';

    clients = {};

    constructor() {
        super(...arguments);

        ['get', 'set', 'expire', 'incr', 'decr', 'exists', 'ttl', 'delete'].map(method => {
            this[method] = function () {
                return this.getCacheClient()[method](...arguments)
            }
        })
    }


    getCacheClient(client_name) {
        if (!client_name)
            client_name = this.config['default'];

        let client = this.clients[client_name];

        if (client)
            return client;

        const clientConfig = this.config['connections'][client_name];

        if (!clientConfig)
            throw new Error(`配置信息不存在！`);


        const ClientClazz = driverMap[clientConfig.driver];

        if (!ClientClazz)
            throw new Error(`${clientConfig.driver} 没有对应的driver！`);

        client = new ClientClazz(clientConfig);

        this.clients[client_name] = client;

        return client;
    }


    destroy() {
        Object.values(this.clients).map(client => client.destroy())
    }
}
