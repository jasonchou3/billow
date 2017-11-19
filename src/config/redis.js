export default {
    default: 'cache',

    connections: {
        cache: {
            host: 'localhost',
            port: 6379,
            // password: null,
            // db: 0
        },

        queue: {
            host: 'localhost',
            port: 6379,
            db: 1
            // password: null,
        },

        session: {
            host: 'localhost',
            port: 6379,
            db: 2
            // password: null,
        }
    }
}