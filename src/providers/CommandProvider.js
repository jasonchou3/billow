import Provider from '../../libs/framework/providers/CommandProvider'
import PushUserMsgCommand from '../commands/PushUserMsgCommand'

export default class CommandProvider extends Provider {
    commands = [
        PushUserMsgCommand
    ];
}