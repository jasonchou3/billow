import MakeFromTemplateCommand from './MakeFromTemplateCommand'

export default class MakeCommandCommand extends MakeFromTemplateCommand {
    static key = 'make:command';

    async handle(name) {
        await this.copy(this.getTemplatePath('/command.js.tmp'), this.getPath(), name + 'Command', 'js', {
            name,
            key: name.toLowerCase()
        })
    }

    getPath() {
        return this.app.commandPath;
    }
}