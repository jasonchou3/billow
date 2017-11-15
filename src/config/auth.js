export default {
    default: 'api',

    guards: {
        api: {
            driver: 'session', //jwt or session
            'model': 'User' //  app/models/目录
        }
    },

    jwt: {
        secret: '',
        ttl: 60,
        refresh_ttl: 20160 // 单位 min
    },

    session: {}
}