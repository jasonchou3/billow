import Service from './Service'

const mongoose = require('mongoose');

export default class Mongo extends Service {
    single = true;
    config_key = 'db';

    constructor(connection_key = null) {
        super();

        if (!connection_key)
            connection_key = this.config['default'];

        const {connections} = this.config;
        const config = connections[connection_key];
        mongoose.connection = mongoose.createConnection(this.getConnectionURL(config));
        mongoose.Promise = Promise;
    }

    getConnectionURL(config) {

        const username = config['username'] || '';
        const password = config['password'] || '';
        const hostname = config['hostname'] || 'localhost';
        const port = config['port'] || '27017';
        const database = config['database'] || 'test';

        return `mongodb://${username}:${password}@${hostname}:${port}/${database}`;
    }


    destroy() {
        mongoose.disconnect();
    }
}