import Kernel from '../Kernel'

export default class QueueKernel extends Kernel {
    lifecycle = 'app';

    constructor() {
        super();

        this.constructor.jobs.map(JobClazz => {
            this.app.registerJob(JobClazz)
        })
    }
}