import Provider from './Provider'
import HelperCommand from '../commands/HelpCommand'
import MakeModelCommand from '../commands/make/MakeModelCommand'
import MakeControllerCommand from '../commands/make/MakeControllerCommand'
import MakeCommandCommand from '../commands/make/MakeCommandCommand'

export default class CommandProvider extends Provider {

    commands = [];
    _commands = [
        HelperCommand,
        MakeModelCommand,
        MakeCommandCommand,
        MakeControllerCommand
    ];

    init() {
        (this._commands.concat(this.commands)).map(command_clazz => {
            const command = new command_clazz();
            this.app.registerCommand(command)
        })
    }
}