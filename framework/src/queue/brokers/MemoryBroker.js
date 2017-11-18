import Broker from './Broker'

export default class MemoryBroker extends Broker {
    constructor() {
        super(...arguments);
        this.app.make('queue_kernel');
    }

    dispatch(job) {
        this.handle(this.channel, this.serialize(job));
    }


    subscribe() {
        console.log('memory queue跟调用者在同一进程，无需额外运行！')
    }
}