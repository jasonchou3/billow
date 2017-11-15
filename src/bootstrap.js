import Application from '../framework/src/Application'

(async () => {
    const app = new Application(__dirname, 'http_mode');
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