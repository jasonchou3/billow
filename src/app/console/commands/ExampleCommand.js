import Command from '../../../../framework/src/console/commands/Command'

export default class ExampleCommand extends Command {
    static key = 'example';
    static desc = '默认描述';

    handle(name) {

    }
}