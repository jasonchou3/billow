import Service from './services/Service'


export default class HttpKernel extends Service {
    config_key = 'http';
    lifecycle = 'app';

    listen() {
        this.onListen()
        console.log('listening on: http://localhost:' + this.config.port)
    }

    onListen(){

    }
}

