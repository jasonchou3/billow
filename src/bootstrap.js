import Application from '../libs/framework/Application'
import ConsoleKernel from './console/Kernel'
import httpKernel from './http/Kernel'

(async () => {
    try {
        const app = new Application(__dirname);
        app.registerAlias('console', ConsoleKernel);
        app.registerAlias('http', httpKernel);

        await app.init();

        app.get('http').listen();
    } catch (e) {
        console.log(e)
    }
})();