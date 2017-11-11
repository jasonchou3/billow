import Context from '../../Context'

export default class Broker extends Context {


    constructor(config) {
        super();

        this.config = config;
        this.channel = config.broker + '_' + config.name;
    }
}