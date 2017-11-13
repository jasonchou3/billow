import Application from '../libs/framework/Application'

(async () => {
    try {
        const app = new Application(__dirname, 'http');
        try {
            await app.init();

            app.get('http_kernel').listen();
        } catch (e) {
            app.destroy();
            console.log(e)
        }
    } catch (e) {
        console.log(e)
    }
})();