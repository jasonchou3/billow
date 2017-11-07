import Provider from '../../libs/framework/providers/Provider'

export default class AppProvider extends Provider {

    init() {
        //初始化db
        this.app.make('db');
    }


    boot() {
        //路由

        if (this.app.hasAlias('http')) {
            this.app.make('http');
        }
    }


    destroy() {
        this.app.get('db').destroy();
    }
}