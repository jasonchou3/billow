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
            this.app.commands['help'].handle();
        } else {
            const handler_name = process.argv[2];

            let command = this.app.commands[handler_name];

            if (!command) {
                command = this.app.commands['help'];
                command.handle(handler_name);
            } else {
                const args = process.argv.splice(3, process.argv.length);
                command.handle(...args)
            }
        }
    }
}