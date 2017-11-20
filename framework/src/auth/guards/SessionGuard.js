import Guard from "./Guard";

export default class SessionGuard extends Guard {
    constructor() {
        super(...arguments);

        this.userId = this.ctx.session.userId;
    }

    login(user) {
        this.user = user;
        this.userId = user._id;
        this.ctx.session.userId = user._id;
    }

    logout() {
        this.ctx.session = {};
        this.user = null;
        this.userId = null;
    }
}