import Command from './Command'


export default class HelpCommand extends Command {
    static key = 'help';

    handle(name) {
        require('colors');

        this.printError(name);

        console.log(('   name' + '   ' + 'desc').green);
        for (const key in this.app.commandClasses) {
            console.log(('   ' + key + '   ' + (this.app.commandClasses[key].desc || '-')).green)
        }
        console.log('');
    }

    printError(name) {
        console.log('');

        console.log('   artisan [name] [option] '.green);

        let msg;
        if (name)
            msg = '   ' + name + '不存在！';
        else
            msg = '   name不能为空!';

        console.log(msg.red);
        console.log('');
    }
}