import Application from '../framework/src/Application'

(async () => {
    const app = new Application(__dirname, 'http_mode');

    process.on('SIGINT', () => {
        console.log('billow exit!');
        app.destroy();
        process.exit();
    });

    try {
        await app.init();
        app.service('http_kernel').listen();
    } catch (e) {
        try {
            app.destroy();
            console.log(e)
        } catch (e) {
            console.log(e)
        }
    }
})();