import Kernel from './Kernel'
import HelperCommand from './commands/HelpCommand'
import MakeModelCommand from './commands/make/MakeModelCommand'
import MakeControllerCommand from './commands/make/MakeControllerCommand'
import MakeCommandCommand from './commands/make/MakeCommandCommand'
import MakeListenerCommand from './commands/make/MakeListenerCommand'
import ScheduleCommand from './commands/ScheduleCommand_'
import QueueCommand from './jobs/QueueCommand'

export default class ConsoleKernel extends Kernel {
    lifecycle = 'app';

    commands = [];
    _commands = [
        HelperCommand,
        MakeModelCommand,
        MakeCommandCommand,
        MakeControllerCommand,
        MakeListenerCommand,
        ScheduleCommand,
        QueueCommand
    ];

    constructor() {
        super();

        (this._commands.concat(this.commands)).map(command_clazz => {
            this.app.registerCommand(command_clazz)
        })
    }

    commandHandle(name, args) {
        return this.app.commandHandle(name, args)
    }

    schedule(scheduler) {

    }

    async onError(e) {

    }
}