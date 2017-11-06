import Command from '../../libs/framework/commands/Command'

export default class PushUserMsgCommand extends Command {
    name = 'push:user';

    handle(userId) {
        console.log(userId)
    }

    desc() {
        return '发push给用户 [userId]'
    }
}