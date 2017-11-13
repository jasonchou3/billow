import QueueKernel from '../../../libs/framework/jobs/QueueKernel'
import EmailJob from './jobs/EmailJob'

export default class Kernel extends QueueKernel {

    static jobs = [
        EmailJob
    ];

    async onError(e) {

        console.log('1241231', e)
    }
}