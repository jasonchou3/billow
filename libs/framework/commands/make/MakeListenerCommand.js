import MakeFromTemplateCommand from './MakeFromTemplateCommand'

export default class MakeListenerCommand extends MakeFromTemplateCommand {
    static key = 'make:listener';

    async handle(name) {
        await this.copy(this.wrapTemplatePath('/listener.js.tmp'), this.getPath(), name + 'Listener', 'js', {
            name,
        })
    }

    getPath() {
        return this.app.listenerPath;
    }
}