import Context from '../Context'


export default class Service extends Context {
    // config_key;

    /**
     * 是否是单例
     * @type {boolean}
     */
    // single = false;


    get config() {
        return this.app.config[this.config_key];
    }

    destroy() {

    }

}