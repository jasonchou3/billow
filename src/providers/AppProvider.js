import Provider from '../../libs/framework/providers/Provider'

export default class AppProvider extends Provider {

    init() {
        //初始化db
        this.app.make('db');
    }


    boot() {
        // console.log('boot')
    }


    destroy() {
        this.app.get('db').destroy();
    }
}