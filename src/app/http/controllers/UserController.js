import Controller from '../../../../libs/framework/controllers/Controller'
import EmailJob from '../../queue/jobs/EmailJob'

export default class UserController extends Controller {
    handle() {

    }

    // get(ctx) {
    //     ctx.body = 'ahaha'
    // }

    post(ctx) {
        ctx.body = 'ahaha'
    }


    async index(ctx) {

        // throw new Error(14211)
        await this.app.get('redis').getClient().setAsync('name', 'zw');
        this.app.event_fire('example-event', 1, 2, 2, 2);

        EmailJob.init('hello!', 'hahaha').dispatch();
        ctx.body = 'index'
    }
}