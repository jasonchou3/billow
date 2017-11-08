import Service from './Service'

const redis = require('redis');
const bluebird = require("bluebird");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

export default class Redis extends Service {
    lifecycle = 'app';
    config_key = 'redis';

    clients = {};

    getClient(connection_name = null) {
        if (!connection_name)
            connection_name = this.config['default'];

        if (!this.clients[connection_name]) {
            const {connections} = this.config;
            const connection_config = connections[connection_name];
            if (!connection_config)
                throw Error(`没有 ${connection_name} 的redis连接信息！`);


            const client = redis.createClient(connection_config);
            client.on("error", function (err) {
                console.log("Error " + err);
            });

            this.clients[connection_name] = client
        }

        return this.clients[connection_name];
    }

    destroy() {
        Object.values(this.clients).map(client => client.quit())
    }
}