import Service from "../../services/Service";

const uid = require("uid-safe");

export default class SessionStore extends Service {
    config_key = 'session';

    get(sessionId) {

    }

    set(content, opt) {

    }

    remove(sessionId) {

    }

    generateSessionId() {
        return uid.sync(24);
    }
}