import Context from './Context'
import Container from './Container'
import CommandContainer from './commands/CommandContainer'
import ListenerContainer from './listeners/ListenerContainer'
import ServiceContainer from './services/ServiceContainer'
import JobsContainer from './jobs/JobsContainer'
import './global'
import {mixin} from './libs/js-extensions'

class Application extends Container {

    constructor(project_root_path, mode) {
        super(project_root_path);

        Context.app = this;
        this.appMode = mode
    }

    isHttpMode() {
        return this.appMode === 'http'
    }

    get modelPath() {
        return this.appPath + '/models';
    }


    get controllerPath() {
        return this.appPath + '/http/controllers';
    }

    get appPath() {
        return this.project_root_path + '/app'
    }
}


export default mixin(Application, [CommandContainer, ListenerContainer, ServiceContainer, JobsContainer]);