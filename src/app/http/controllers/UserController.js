import Controller from '../../../../framework/src/controllers/Controller'
import EmailJob from '../../queue/jobs/EmailJob'
import {inject, isAuthenticated} from '../../../../framework/src/decorators'

export default class UserController extends Controller {
    handle() {

    }

    @isAuthenticated()
    @inject('cache')                                      //依赖注入
    async get([cache], ctx) {
        await ctx.auth.authenticate('zhou', 'asdfs');
        // throw new Error(14211)                         //错误收集
        await cache.set('name', 'xxxxx');

        const value = await cache.get('name');

        await cache.expire('name', 100);

        console.log(await cache.ttl('name'));


        this.event_fire('order-success', {userId: 1111}); //消息机制解耦

        EmailJob.init('hello!', '购买成功！').dispatch();      //队列任务
        ctx.body = 'index'                                 //koa api
    }


    async login(ctx) {
        // await ctx.auth.authenticate('zhou', 'asdfs');

        // ctx.session.user = {name: 'asad'};
        ctx.session = null;
        ctx.body = 'login'
    }
}