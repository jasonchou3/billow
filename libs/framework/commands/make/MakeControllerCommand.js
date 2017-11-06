import MakeFromTemplateCommand from './MakeFromTemplateCommand'

export default class MakeControllerCommand extends MakeFromTemplateCommand {
    name = 'make:controller';

    async handle(name) {
        await this.copy(this.wrapTemplatePath('/controller.js.tmp'), this.getControllerPath(), name + 'Controller', 'js', {
            name,
        })
    }

    getControllerPath() {
        return this.app.controllerPath;
    }
}