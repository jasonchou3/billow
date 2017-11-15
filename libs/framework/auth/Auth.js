import Service from "../services/Service";
import SessionGuard from "./guards/SessionGuard";
import JWTGuard from "./guards/JWTGuard";

const guards = {
    session: SessionGuard,
    jwt: JWTGuard,
};

export default class Auth extends Service {
    config_key = 'auth';

    guardInstances = {};

    constructor(ctx) {
        super();
        this.ctx = ctx;
    }


    getGuard(guard_name = null) {
        if (!guard_name)
            guard_name = this.config.default;

        if (!this.config.guards[guard_name]) {
            const guards = Object.keys(this.config.guards).join('，');
            throw new Error(`auth guard: ${guard_name} 不存在！只有以下几种：${guards}`)
        }


        const GuardClass = guards[this.config.guards[guard_name].driver];

        if (!GuardClass) {
            const guardClasses = Object.keys(guards).join('，');

            throw new Error(`auth driver: ${this.config.guards[guard_name].driver} 不存在！只有以下几种：${guardClasses}`)
        }

        if (!this.guardInstances[guard_name]) {
            const guard = this.config.guards[guard_name];

            this.guardInstances[guard_name] = new GuardClass(this.ctx, guard.model, this.config[guard.driver]);
        }


        return this.guardInstances[guard_name];
    }

    /**
     * 尝试认证
     */
    authenticate() {
        const guard = this.getGuard();
        return guard.authenticate(...arguments);
    }

    isAuthenticated() {
        return this.getGuard().isAuthenticated();
    }

    /**
     * 登录
     */
    login(user) {

    }

    getUser() {

    }
}