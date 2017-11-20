import Store from "./SessionStore";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export default class MongoStore extends Store {
    async get(sessionId) {
        let session = await Session.findOne({sid: this.getKey(sessionId)});
        if (session)
            return session.content;
    }

    getKey(sessionId) {
        return this.config['prefix'] + sessionId;
    }

    async set(sessionId, content) {
        if (!sessionId)
            sessionId = this.generateSessionId();

        await Session.findOneAndUpdate({sid: this.getKey(sessionId)}, {$set: {content}}, {upsert: true});

        return sessionId;
    }

    remove(sessionId) {
        return Session.remove({sid: this.getKey(sessionId)})
    }
}

const SessionSchema = new Schema({
    sid: String,
    content: {},
    time: {type: Date, default: Date.now}
});

if (Store.app.config['session'.ttl])
    SessionSchema.index({time: 1}, {expireAfterSeconds: Store.app.config['session'.ttl]});

SessionSchema.index({sid: 1}, {unique: true});
export const Session = mongoose.model('session', SessionSchema);


