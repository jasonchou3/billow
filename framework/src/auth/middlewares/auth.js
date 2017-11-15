import Context from '../../Context'

export default async (ctx, next) => {
    ctx.getAuth = function () {
        if (!this._authInstance) {
            this._authInstance = Context.app.service('auth', [ctx])
        }

        return this._authInstance
    };

    await next()
}