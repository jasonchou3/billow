import Command from './Command'

const parser = require('cron-parser');

export default class ScheduleCommand extends Command {
    static key = 'schedule:run';
    static desc = '执行计划任务';

    async handle(name) {
        const kernel = this.app.service('console_kernel');
        try {
            await kernel.schedule(this);
        } catch (e) {
            await kernel.onError(e)
        }
    }

    async run(date, cb) {
        const nowDate = new Date();
        const options = {
            currentDate: nowDate,
        };


        const interval = parser.parseExpression(date, options);
        const nextDate = interval.next();


        const d = nextDate.getTime() - nowDate.valueOf();

        if (d < 60 * 1000) { //1分钟以内
            await cb();
        }
    }

}

