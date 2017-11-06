import Command from './Command'

export default class HelpCommand extends Command {
    name = 'help';

    handle(name) {

        this.printError(name);

        console.log('   name' + '   ' + 'desc');
        for (const key in this.app.commands) {
            console.log('   ' + key + '   ' + (this.app.commands[key].desc() || '-'))
        }
        console.log('');
    }

    printError(name) {
        console.log('');

        let msg = 'artisan [name] . ';
        if (name)
            msg += name + '不存在！';
        else
            msg += 'name不能为空!';

        console.log(msg);
        console.log('');
    }
}