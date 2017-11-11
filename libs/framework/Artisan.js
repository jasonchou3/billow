import Application from './Application'
import Command from './commands/Command'

export default class Artisan extends Command {

    async init(path) {
        const app = new Application(path);
        await app.init();

        return app;
    }

    async handle() {
        if (process.argv.length === 2) {
            this.app.commandHandle('help')
        } else {
            const handler_name = process.argv[2];

            let commandClazz = this.app.commandClasses[handler_name];

            if (!commandClazz) {
                this.app.commandHandle('help', [handler_name])
            } else {
                const args = process.argv.splice(3, process.argv.length);
                await this.app.commandHandle(handler_name, args)
            }
        }
    }
}