import Provider from '../../libs/framework/providers/CommandProvider'
import ExampleCommand from '../commands/ExampleCommand'

export default class CommandProvider extends Provider {
    commands = [
        ExampleCommand
    ];
}