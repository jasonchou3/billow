const parser = require('cron-parser');

export default {
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
};