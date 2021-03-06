import Kernel from '../Kernel'
import HelperCommand from './commands/HelpCommand'
import MakeModelCommand from './commands/make/MakeModelCommand'
import MakeControllerCommand from '../controllers/MakeControllerCommand'
import MakeCommandCommand from './commands/make/MakeCommandCommand'
import MakeListenerCommand from '../listeners/MakeListenerCommand'
import ScheduleCommand from './commands/ScheduleCommand'
import QueueCommand from '../queue/QueueCommand'

export default class ConsoleKernel extends Kernel {
    single = true;

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