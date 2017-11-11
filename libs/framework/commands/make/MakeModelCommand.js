import MakeFromTemplateCommand from './MakeFromTemplateCommand'

export default class MakeModelCommand extends MakeFromTemplateCommand {
    static key = 'make:model';

    async handle(name) {
        await this.copy(this.wrapTemplatePath('/model.js.tmp'), this.getPath(), name, 'js', {name})
    }

    getPath() {
        return this.app.modelPath;
    }
}