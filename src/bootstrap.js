import Application from '../libs/framework/Application'
import ConsoleKernel from './console/Kernel'
import httpKernel from './http/Kernel'

(async () => {
    try {
        const app = new Application(__dirname);

        try {
            app.registerAlias('console', ConsoleKernel);
            app.registerAlias('http', httpKernel);

            await app.init();

            app.get('http').listen();
        } catch (e) {
            app.destroy();
            console.log(e)
        }
    } catch (e) {
        console.log(e)
    }
})();