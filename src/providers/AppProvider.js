import Provider from '../../libs/framework/providers/Provider'

export default class AppProvider extends Provider {

    init() {

        this.app.get('db');
    }


    boot() {
        // console.log('boot')
    }


    destroy() {
        this.app.get('db').destroy();
    }
}