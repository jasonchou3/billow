import Command from '../../../libs/framework/commands/Command'

export default class ExampleCommand extends Command {
    name = 'example';

    handle(name) {

    }

    desc() {
        return '默认描述'
    }
}