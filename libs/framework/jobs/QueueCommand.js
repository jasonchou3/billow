import Command from '../commands/Command'
import QueueNotFoundException from "./exceptions/QueueNotFoundException";

export default class QueueCommand extends Command {
    static key = 'queue:run';
    static desc = '执行计划任务';

    async handle(channel) {
        if (!channel)
            channel = 'default';

        const queueServer = this.app.get('queue_manager');
        const queue = queueServer.getQueue(channel);

        this.app.make('queue_kernel');

        while (true) {
            try {
                await queue.subscribe();
            } catch (e) {
                this.app.get('queue_kernel').onError(e)
            }
        }
    }

}

