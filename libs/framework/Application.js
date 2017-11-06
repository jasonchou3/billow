import Context from './Context'
import Container from './Container'
import './global'

export default class Application extends Container {

    constructor(project_root_path) {
        super(project_root_path);

        Context.app = this;
    }

    listen() {

    }


    get modelPath() {
        return this.project_root_path + '/models';
    }

    get commandPath() {
        return this.project_root_path + '/commands';
    }
}