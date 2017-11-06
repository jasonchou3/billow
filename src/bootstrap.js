import Application from '../libs/framework/Application'

(async () => {
    const app = new Application(__dirname);
    await app.init();

    app.listen();
})();