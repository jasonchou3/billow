import Mongo from '../../libs/framework/services/Mongo'
import AppProvider from '../providers/AppProvider'
import CommandProvider from '../providers/CommandProvider'

export default {

    providers: [
        CommandProvider,
        AppProvider
    ],


    alias: {
        db: Mongo,
    }
}