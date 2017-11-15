import Context from '../../Context'

export default class Broker extends Context {

    constructor(config) {
        super();

        this.config = config;
        this.channel = this.app.config['app'].app_name + '_' + config.broker + '_' + config.name;
    }

    serialize(job) {
        return JSON.stringify(
            {
                d: job.data, //data
                j_k: job.constructor.key //job_key
            }
        )
    }

    async handle(channel, jsonStr) {
        try {
            const jobJSONObj = JSON.parse(jsonStr);
            const JobClass = this.app.getJob(jobJSONObj.j_k);
            const job = new JobClass();
            job.data = jobJSONObj.d;
            await job.handle()
        } catch (e) {
            e.context = jsonStr;
            e.channel = channel;
            await this.app.service('queue_kernel').onError(e)
        }
    }
}