import Controller from '../../../libs/framework/controllers/Controller'

export default class UserController extends Controller {
    handle() {

    }

    // get(ctx) {
    //     ctx.body = 'ahaha'
    // }

    post(ctx) {
        ctx.body = 'ahaha'
    }


    index(ctx) {

        throw new Error(14211)

        this.app.event_fire('example-event');
        ctx.body = 'index'
    }
}