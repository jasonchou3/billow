import Kernel from '../Kernel'

export default class QueueKernel extends Kernel {
    single = true;

    constructor() {
        super();

        this.constructor.jobs.map(JobClazz => {
            this.app.registerJob(JobClazz)
        })
    }
}