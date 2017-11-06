import Provider from '../../libs/framework/providers/Provider'
import routes from '../http/routes'

export default class AppProvider extends Provider {

    init() {
        //初始化db
        this.app.make('db');
    }


    boot() {
        //路由

        if (this.app.hasAlias('http')) {
            routes(this.app.get('http').getRouter());
            this.app.get('http').setup();
        }
    }


    destroy() {
        this.app.get('db').destroy();
    }
}