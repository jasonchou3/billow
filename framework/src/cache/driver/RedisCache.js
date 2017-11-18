import Cache from "./Cache";

export default class RedisCache extends Cache {
    getClient() {
        return this.service('redis').getClient(this.config.connection)
    }

    get(k) {
        return this._method('get', ...arguments)
    }

    set(k, v) {
        return this._method('set', ...arguments)
    }

    incr(k, increment = 1) {
        return this._method('incrby', ...arguments)
    }

    decr(k, increment = 1) {
        return this._method('decrby', ...arguments)
    }

    delete(k) {
        return this._method('del', ...arguments)
    }

    exists(k) {
        return this._method('exists', ...arguments)
    }

    expire(k, seconds) {
        return this._method('expire', ...arguments)
    }

    ttl(k) {
        return this._method('ttl', ...arguments)
    }

    _method(methodName, ...args) {
        return this.getClient()[methodName + 'Async'](...args);
    }
}