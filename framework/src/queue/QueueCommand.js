import Command from '../console/commands/Command'
import QueueNotFoundException from "./exceptions/QueueNotFoundException";

export default class QueueCommand extends Command {
    static key = 'queue:run';
    static desc = '执行计划任务';

    async handle(channel) {
        const queueManager = this.app.service('queue');
        this.app.make('queue_kernel');

        await queueManager.subscribe(channel);
    }

}

