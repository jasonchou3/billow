import Application from '../libs/framework/Application'
import ConsoleKernel from './console/Kernel'

(async () => {
    try {
        const app = new Application(__dirname);
        await app.init();
        app.registerAlias('console', ConsoleKernel);

        app.listen();
    } catch (e) {
        console.log(e)
    }
})();