import Context from './Context'
import Container from './Container'
import CommandContainer from './commands/CommandContainer'
import ListenerContainer from './listeners/ListenerContainer'
import ServiceContainer from './services/ServiceContainer'
import './global'
import {mixin} from './libs/js-extensions'

class Application extends Container {

    constructor(project_root_path) {
        super(project_root_path);

        Context.app = this;
    }

    get modelPath() {
        return this.project_root_path + '/models';
    }


    get controllerPath() {
        return this.project_root_path + '/http/controllers';
    }
}


export default mixin(Application, [CommandContainer, ListenerContainer, ServiceContainer]);