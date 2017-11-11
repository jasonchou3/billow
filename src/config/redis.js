export default {
    default: 'cache',

    connections: {
        cache: {
            host: 'localhost',
            port: 6379,
            // user: null,
            // password: null,
            // db: 0
        },

        queue: {
            host: 'localhost',
            port: 6379,
            db: 1
            // user: null,
            // password: null,
            // db: 0
        }
    }
}