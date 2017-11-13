import Redis from '../../libs/framework/services/Redis'
import Queue from '../../libs/framework/jobs/Queue'
import Mongo from '../../libs/framework/services/Mongo'
import AppProvider from '../providers/AppProvider'
import EventProvider from '../providers/EventsProvider'
import ConsoleKernel from '../app/console/Kernel'
import HttpKernel from '../app/http/Kernel'
import QueueKernel from '../app/queue/Kernel'

export default {

    debug: true,

    providers: [
        AppProvider,
        EventProvider,
    ],

    alias: {
        db: Mongo,
        redis: Redis,
        queue_manager: Queue,
        console_kernel: ConsoleKernel,
        http_kernel: HttpKernel,
        queue_kernel: QueueKernel,
    }
}