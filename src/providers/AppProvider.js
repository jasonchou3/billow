import Provider from '../../framework/src/providers/Provider'

export default class AppProvider extends Provider {

    init() {
        //初始化db
        this.app.make('db');
    }


    boot() {
        //路由

        if (this.app.isHttpMode()) {
            this.app.make('http_kernel');
        }
    }


    destroy() {
        this.app.service('db').destroy();

        if (this.app.hasService('redis')) {
            this.app.service('redis').destroy();
        }

        if (this.app.hasService('cache')) {
            this.app.service('cache').destroy();
        }
    }
}