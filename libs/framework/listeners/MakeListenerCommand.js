import MakeFromTemplateCommand from '../console/commands/make/MakeFromTemplateCommand'

export default class MakeListenerCommand extends MakeFromTemplateCommand {
    static key = 'make:listener';

    async handle(name) {
        await this.copy(this.getTemplatePath('/listener.js.tmp'), this.getPath(), name + 'Listener', 'js', {
            name,
        })
    }

    getTemplatePath(path) {
        return __dirname + path;
    }

    getPath() {
        return this.app.listenerPath;
    }
}