import Redis from '../../libs/framework/services/Redis'
import Queue from '../../libs/framework/jobs/Queue'
import Mongo from '../../libs/framework/services/Mongo'
import AppProvider from '../providers/AppProvider'
import EventProvider from '../providers/EventsProvider'
import JobsProvider from '../providers/JobsProvider'
import ConsoleKernel from '../app/console/Kernel'
import HttpKernel from '../app/http/Kernel'
import QueueKernel from '../app/queue/Kernel'

export default {

    debug: true,

    providers: [
        AppProvider,
        EventProvider,
        JobsProvider
    ],

    alias: {
        db: Mongo,
        redis: Redis,
        queue_manager: Queue,
        console: ConsoleKernel,
        http: HttpKernel,
        queue: QueueKernel,
    }
}