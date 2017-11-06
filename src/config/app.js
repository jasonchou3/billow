import Mongo from '../../libs/framework/services/Mongo'
import AppProvider from '../providers/AppProvider'
import EventProvider from '../providers/EventProvider'

export default {

    providers: [
        AppProvider,
        EventProvider
    ],


    alias: {
        db: Mongo,
    }
}