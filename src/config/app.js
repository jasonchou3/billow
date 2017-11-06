import Mongo from '../../libs/framework/services/Mongo'
import AppProvider from '../providers/AppProvider'

export default {

    providers: [
        AppProvider
    ],


    alias: {
        db: Mongo,
    }
}