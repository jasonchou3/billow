export default {
    default: 'api',

    guards: {
        api: {
            driver: 'session', //jwt or session
            'model': 'User' //  app/models/目录
        }
    },

}