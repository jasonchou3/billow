import Command from '../Command'
import fs from '../../../libs/async-fs'
import {replaceAll} from '../../../libs/js-extensions'

export default class MakeFromTemplateCommand extends Command {

    async copy(template_path, to_path, name, postfix, variables = {}) {
        let content = await fs.readFile(template_path);

        for (const v in variables) {
            content = replaceAll(content, this.wrapVariable(v), variables[v]);
        }

        await fs.writeFile(to_path + '/' + name + '.' + postfix, content);
    }

    // wrapTemplatePath(path) {
    //     return __dirname + path;
    // }

    getTemplatePath(path){
        return __dirname + path;
    }

    wrapVariable(v) {
        return '\\$' + v + '\\$';
    }
}