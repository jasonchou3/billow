export default {
    default: 'memory',
    // default: 'redis',
    connections: {
        redis: {
            driver: 'redis',
            connection: 'cache'
        },

        memory: {
            driver: 'memory',
            storage: true
        }
    }
}