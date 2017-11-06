import MakeFromTemplateCommand from './MakeFromTemplateCommand'

export default class MakeModelCommand extends MakeFromTemplateCommand {
    name = 'make:model';

    async handle(name) {
        await this.copy(this.wrapTemplatePath('/model.js.tmp'), this.getModelPath(), name, 'js', {name})
    }

    getModelPath() {
        return this.app.modelPath;
    }
}