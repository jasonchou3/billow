import Command from './Command'
import scheduler from '../scheduler'


export default class ScheduleCommand extends Command {
    name = 'schedule:run';

    handle(name) {

        const kernel = this.app.get('console');

        kernel.schedule(scheduler);
    }

    desc() {
        return '执行计划任务'
    }
}

