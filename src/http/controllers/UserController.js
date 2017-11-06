import Controller from '../../../libs/framework/controllers/Controller'

export default class UserController extends Controller {
    handle() {

    }

    get(ctx) {
        ctx.body = 'ahaha'
    }
}