import MakeFromTemplateCommand from '../console/commands/make/MakeFromTemplateCommand'

export default class MakeControllerCommand extends MakeFromTemplateCommand {
    static key = 'make:controller';

    async handle(name) {
        await this.copy(this.getTemplatePath('/controller.js.tmp'), this.getPath(), name + 'Controller', 'js', {
            name,
        })
    }

    getTemplatePath(path) {
        return __dirname + path;
    }

    getPath() {
        return this.app.controllerPath;
    }
}