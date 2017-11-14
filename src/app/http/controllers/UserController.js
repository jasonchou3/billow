import Controller from '../../../../libs/framework/controllers/Controller'
import EmailJob from '../../queue/jobs/EmailJob'
import inject from '../../../../libs/framework/decorators/inject'

export default class UserController extends Controller {
    handle() {

    }

    // get(ctx) {
    //     ctx.body = 'ahaha'
    // }

    post(ctx) {
        ctx.body = 'ahaha'
    }


    @inject('redis')
    async index([cache], ctx) {

        // throw new Error(14211)
        await cache.getClient().setAsync('name', 'xxxxx');
        this.app.event_fire('example-event', 1, 2, 2, 2);

        EmailJob.init('hello!', 'hahaha').dispatch();
        ctx.body = 'index'
    }
}