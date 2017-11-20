import Provider from '../providers/Provider'

export default class SessionProvider extends Provider {

    init() {
        this.app.registerAliasImplementation('session_store', 'redis', __dirname + '/store/RedisStore');
        this.app.registerAliasImplementation('session_store', 'mongo', __dirname + '/store/MongoStore');
    }

    boot() {
        this.app.switchAliasImplementation('session_store', this.app.config['session'].driver);
    }
}