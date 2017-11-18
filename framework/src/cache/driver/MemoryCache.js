import Cache from "./Cache";
import fs from 'fs'

export default class MemoryCache extends Cache {

    constructor() {
        super(...arguments);

        this.load();
    }

    load() {
        if (this.config.storage)
        //从本地初始化
            try {
                this._cache = JSON.parse(fs.readFileSync(this.getCacheStorageFile()));

                const now = Date.now();
                for (let key in this._cache) {
                    const value = this._cache[key];
                    if (value.expire)
                        if (now >= value.expire) {
                            delete this._cache[key];
                        } else {
                            this.addTimeoutHandler(k, value.expire - now);
                        }
                }
            } catch (e) {

            }
    }

    _cache = {};
    _timeoutHandler = {};

    get(key) {
        if (this._cache[key])
            return this._cache[key].v;
    }

    set(key, v) {
        this._cache[key] = {v};
        return v;
    }

    incr(k, increment = 1) {
        if (this._cache[k]) {
            this._cache[k].v += increment;
        } else {
            this._cache[k] = {v: 1}
        }
        return this._cache[k].v;
    }

    decr(k, increment = 1) {
        if (this._cache[k]) {
            this._cache[k].v -= increment;
        } else {
            this._cache[k] = {v: 1}
        }
        return this._cache[k].v;
    }

    delete(k) {
        if (this._cache[k]) {
            delete this._cache[k];
            return true;
        }

        return false;
    }

    exists(k) {
        return !!this._cache[k]
    }

    expire(k, seconds) {
        if (this._cache[k]) {
            this._cache[k].expire = Date.now() + seconds * 1000;

            this.addTimeoutHandler(k, seconds * 1000);
            return true;
        }

        return false;
    }

    addTimeoutHandler(k, ms) {
        if (this._timeoutHandler[k])
            clearTimeout(this._timeoutHandler[k]);

        this._timeoutHandler[k] = setTimeout(() => {
            this.delete(k);
        }, ms);
    }

    ttl(k) {
        if (this._cache[k]) {

            if (!this._cache[k].expire)
                return -1;

            return (this._cache[k].expire - Date.now()) / 1000;
        }

        return -2
    }


    getCacheStorageFile() {
        return this.app.project_root_path + '/' + '.cache';
    }

    destroy() {
        if (this.config.storage)
            fs.writeFileSync(this.getCacheStorageFile(), JSON.stringify(this._cache))
    }
}