import Service from './services/Service'

const Koa = require('koa');


export default class HttpKernel extends Service {
    config_key = 'http';
    lifecycle = 'app';

    constructor() {
        super();
        this.http = new Koa();
        this.init()
    }


    init() {

    }


    listen() {
        this.http.listen(this.config.port);
        console.log('listening on: http://localhost:' + this.config.port)
    }
}

