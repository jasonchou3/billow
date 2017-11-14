import Broker from './Broker'

export default class RedisBroker extends Broker {

    async dispatch(job) {
        await this.getClient().rpushAsync(this.channel, this.serialize(job));
    }

    async subscribe() {
        while (true) {
            const [channel, jsonStr] = await this.getClient().blpopAsync(this.channel, 0);
            this.handle(channel, jsonStr)
        }
    }


    getClient() {
        return this.app.get('redis').getClient(this.config.connection);
    }

}


// async dispatch(job) {
//     console.log('asfsdafs', this.channel)
//     await this.getClient().publishAsync(this.channel,
//         JSON.stringify(
//             {
//                 d: job.data, //data
//                 j_k: job.constructor.key //job_key
//             }
//         ))
//     ;
// }

// subscribe() {
//     this.getClient().psubscribe(this.channel);
//
//     this.getClient().on('psubscribe', async (channel, count) => {
//         console.log(`channel：${channel}，队列数量： ${count}`)
//     });
//
//     this.getClient().on('pmessage', this.handle.bind(this))
// }