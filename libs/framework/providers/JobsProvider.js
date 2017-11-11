import Provider from './Provider'

export default class JobsProvider extends Provider {
    boot() {
        this.jobs.map(JobClazz => {
            this.app.registerJob(JobClazz)
        })
    }
}