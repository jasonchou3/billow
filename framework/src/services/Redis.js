import Service from './Service'

export default class Redis extends Service {
    single = true;
    config_key = 'redis';

    connectionPool = {};

    constructor() {
        super(...arguments);

        try {
            this.redis = require('redis');
            const bluebird = require("bluebird");

            bluebird.promisifyAll(this.redis.RedisClient.prototype);
            bluebird.promisifyAll(this.redis.Multi.prototype);
        } catch (e) {
            throw new Error(`请先安装redis依赖：npm install redis bluebird！`);
        }
    }

    getClient(connection_name = null) {
        if (!connection_name)
            connection_name = this.config['default'];

        const {connections} = this.config;
        let connection_config = connections[connection_name];
        if (!connection_config)
            throw Error(`没有 ${connection_name} 的redis连接信息！`);

        connection_config = Object.assign({
            host: 'localhost',
            port: 6379,
            // password: '',
            db: 0
        }, connection_config);


        const conKey = this.getConnectionKey(connection_config);
        if (!this.connectionPool[conKey]) {
            const client = this.redis.createClient(connection_config);
            client.on("error", function (err) {
                console.log("Error " + err);
            });

            this.connectionPool[conKey] = client
        }

        return this.connectionPool[conKey];
    }


    getConnectionKey({host, port, db}) {
        return host + ':' + port + '/' + db
    }

    destroy() {
        Object.values(this.connectionPool).map(client => client.quit())
    }
}