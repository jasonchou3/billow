import Context from '../../Context'

export default async (ctx, next) => {
    ctx['auth'] = Context.app.service('auth', [ctx]);
    await next();
    await ctx['auth'].onRequestFinish();
}