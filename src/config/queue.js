export default {
    default: 'memory',
    channels: {
        memory: {
            broker: 'memory',
        },

        redis: {
            broker: 'redis',
            connection: 'queue'
        },
    }
}