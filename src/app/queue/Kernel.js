import QueueKernel from '../../../framework/src/queue/QueueKernel'
import EmailJob from './jobs/EmailJob'

export default class Kernel extends QueueKernel {

    static jobs = [
        EmailJob
    ];

    async onError(e) {
        const {message, context, channel, job_data} = e;
    }
}