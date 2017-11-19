import Context from '../../Context'

export default async (ctx, next) => {
    const sessionIdName = Context.app.config['session'].name;
    let sessionId = ctx.cookies.get(sessionIdName);

    if (sessionId) {
        const store = Context.app.service('session_store');
        ctx.session = await store.get(sessionId);
    }

    if (typeof ctx.session !== "object" || ctx.session == null) {
        ctx.session = {};
    }

    const old = JSON.stringify(ctx.session);

    await next();
    if (old === JSON.stringify(ctx.session))
        return;

    // update
    if (ctx.session && Object.keys(ctx.session).length) {
        const store = Context.app.service('session_store');

        const newSessionId = await store.set(sessionId, ctx.session);

        const opts = {};

        if (Context.app.config['session'].ttl) {
            opts['maxAge'] = Context.app.config['session'].ttl * 1000;
        }

        ctx.cookies.set(sessionIdName, newSessionId, opts);

    } else if (sessionId) {
        const store = Context.app.service('session_store');
        ctx.cookies.set(sessionIdName, null, {maxAge: 0});
        await store.remove(sessionId);
    }
}