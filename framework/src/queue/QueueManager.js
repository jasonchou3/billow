import Service from '../services/Service'
import RedisBroker from './brokers/RedisBroker'
import MemoryBroker from './brokers/MemoryBroker'
import QueueNotFoundException from './exceptions/QueueNotFoundException'

const brokerMap = {
    redis: RedisBroker,
    memory: MemoryBroker,
};

export default class QueueManager extends Service {
    single = true;
    config_key = 'queue';

    queues = {};

    dispatch(job) {
        const queue = this.getQueue(job.channel);
        return queue.dispatch(job);
    }

    getQueue(channelName) {
        if (!channelName)
            channelName = this.config.default;

        let queue = this.queues[channelName];

        if (queue)
            return queue;

        const queue_config = this.config.channels[channelName];

        if (!queue_config)
            throw new QueueNotFoundException(`${channelName} 配置信息不存在！`);

        const BrokerClazz = brokerMap[queue_config.broker];
        if (!BrokerClazz)
            throw new QueueNotFoundException(`${channelName} 没有对应的broker！`);

        queue_config.name = channelName;
        queue = new BrokerClazz(queue_config);

        this.queues[channelName] = queue;

        return queue;
    }

    subscribe(channelName) {
        this.getQueue(channelName).subscribe();
    }

}