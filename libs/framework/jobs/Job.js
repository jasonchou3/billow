import Context from '../Context'


export default class Job extends Context {
    channel = 'default';

    /**
     * 会被序列化到存储
     * @type {{}}
     */

    // data = {};

    /**
     * 执行逻辑，本方法在队列进程执行
     */
    handle() {

    }

    dispatch() {
        this.app.get('queue_manager').dispatch(this);
    }

    /**
     * 使用init创建Job
     * @returns {Job}
     */
    static init() {
        const instance = new this();
        instance.init(...arguments);
        return instance
    }
}