import Controller from '../../../libs/framework/controllers/Controller'

export default class UserController extends Controller {
    handle() {

    }

    get(ctx) {
        ctx.body = 'ahaha'
    }

    post(ctx) {
        ctx.body = 'ahaha'
    }


    index(ctx) {
        ctx.body = 'index'
    }
}