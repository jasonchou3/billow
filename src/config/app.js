import Redis from '../../libs/framework/services/Redis'
import Mongo from '../../libs/framework/services/Mongo'
import AppProvider from '../providers/AppProvider'
import EventProvider from '../providers/EventProvider'

export default {

    debug: true,

    providers: [
        AppProvider,
        EventProvider
    ],


    alias: {
        db: Mongo,
        redis: Redis,
    }
}