import Context from '../Context'


export default class Service extends Context {
    config_key;

    /**
     *
     * @type {string} manual 手动管理|app 应用全局|request 请求
     */
    lifecycle = 'manual';

    get config() {
        return this.app.config[this.config_key];
    }
}