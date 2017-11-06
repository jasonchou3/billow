import MakeFromTemplateCommand from './MakeFromTemplateCommand'

export default class MakeCommandCommand extends MakeFromTemplateCommand {
    name = 'make:command';

    async handle(name) {
        await this.copy(this.wrapTemplatePath('/command.js.tmp'), this.getCommandPath(), name + 'Command', 'js', {
            name,
            key: name.toLowerCase()
        })
    }

    getCommandPath() {
        return this.app.commandPath;
    }
}