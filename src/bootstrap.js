import Application from '../libs/framework/Application'

(async () => {
    const app = new Application(__dirname, 'http_mode');
    try {
        await app.init();

        app.get('http_kernel').listen();
    } catch (e) {
        app.destroy();
        console.log(e)
    }
})();