/**
 * 根目录为 bootstrap.js所在目录
 */
export default {

    app_name: 'billow',

    debug: true,

    providers: [
        './providers/AppProvider',
        './providers/EventsProvider',
    ],

    alias: {
        db: '../framework/src/services/Mongo',
        redis: '../framework/src/services/Redis',
        auth: '../framework/src/auth/Auth',
        queue: '../framework/src/queue/QueueManager',
        cache: '../framework/src/cache/CacheManager',
        console_kernel: './app/console/Kernel',
        http_kernel: './app/http/Kernel',
        queue_kernel: './app/queue/Kernel',
    }
}