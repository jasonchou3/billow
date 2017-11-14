import Command from '../console/commands/Command'
import QueueNotFoundException from "./exceptions/QueueNotFoundException";

export default class QueueCommand extends Command {
    static key = 'queue:run';
    static desc = '执行计划任务';

    async handle(channel) {
        if (!channel)
            channel = 'default';

        const queueManager = this.app.get('queue_manager');
        const queue = queueManager.getQueue(channel);

        this.app.make('queue_kernel');

        await queue.subscribe();
    }

}

