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
        db: '../libs/framework/services/Mongo',
        redis: '../libs/framework/services/Redis',
        auth: '../libs/framework/auth/Auth',
        queue_manager: '../libs/framework/jobs/Queue',
        console_kernel: './app/console/Kernel',
        http_kernel: './app/http/Kernel',
        queue_kernel: './app/queue/Kernel',
    }
}