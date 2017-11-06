import Command from '../Command'
import fs from '../../libs/async-fs'
import {replaceAll} from '../../libs/js-extensions'

export default class MakeFromTemplateCommand extends Command {

    async copy(template_path, to_path, name, postfix) {
        try {
            const temp = await fs.readFile(template_path);
            let content = replaceAll(temp, this.wrapVariable('name'), name);
            await fs.writeFile(to_path + '/' + name + '.' + postfix, content);
        } catch (e) {
            console.log(e)
        }
    }

    wrapTemplatePath(path) {
        return __dirname + path;
    }

    wrapVariable(v) {
        return '\\$' + v + '\\$';
    }
}