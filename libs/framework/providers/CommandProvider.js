import Provider from './Provider'
import HelperCommand from '../commands/HelpCommand'
import MakeModelCommand from '../commands/make/MakeModelCommand'

export default class CommandProvider extends Provider {

    commands = [];
    _commands = [
        HelperCommand,
        MakeModelCommand
    ];

    init() {
        (this._commands.concat(this.commands)).map(command_clazz => {
            const command = new command_clazz();
            this.app.registerCommand(command)
        })
    }
}