import Store from "./SessionStore";

export default class RedisStore extends Store {
    async get(sessionId) {
        let content = await this.getRedisClient().getAsync(this.getKey(sessionId));
        if (content)
            content = JSON.parse(content);

        return content;
    }

    getKey(sessionId) {
        return this.config['prefix'] + sessionId;
    }

    getRedisClient() {
        return this.service('redis').getClient(this.config.connection);
    }

    async set(sessionId, content) {
        if (!sessionId)
            sessionId = this.generateSessionId();

        if (this.config.ttl)
            await this.getRedisClient().setexAsync(this.getKey(sessionId), this.config.ttl, JSON.stringify(content));
        else
            await this.getRedisClient().setexAsync(this.getKey(sessionId), JSON.stringify(content));

        return sessionId;
    }

    remove(sessionId) {
        return this.getRedisClient().del(this.getKey(sessionId));
    }
}