import Service from '../services/Service'
import RedisBroker from './brokers/RedisBroker'
import QueueNotFoundException from './exceptions/QueueNotFoundException'

const brokerMap = {
    redis: RedisBroker
};

export default class Queue extends Service {
    lifecycle = 'app';
    config_key = 'queue';

    queues = {};

    dispatch(job) {
        const queue = this.getQueue(job.channel);
        return queue.dispatch(job);
    }

    getQueue(channelName) {
        let queue = this.queues[channelName];

        if (queue)
            return queue;

        const queue_config = this.config.channels[channelName];

        if (!queue_config)
            throw new QueueNotFoundException(`配置信息不存在！`)

        const BrokerClazz = brokerMap[queue_config.broker];
        if (!BrokerClazz)
            throw new QueueNotFoundException(`没有对应的broker！`)

        queue_config.name = channelName;
        queue = new BrokerClazz(queue_config);

        this.queues[channelName] = queue;

        return queue;
    }
}