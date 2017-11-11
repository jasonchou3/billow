import Command from './Command'
import scheduler from '../scheduler'


export default class ScheduleCommand extends Command {
    static key = 'schedule:run';
    static desc = '执行计划任务';

    handle(name) {

        const kernel = this.app.get('console');

        kernel.schedule(scheduler);
    }

}

