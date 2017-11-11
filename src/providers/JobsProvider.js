import Provider from '../../libs/framework/providers/JobsProvider'
import EmailJob from '../app/queue/jobs/EmailJob'

export default class JobsProvider extends Provider {
    jobs = [
        EmailJob
    ]
}