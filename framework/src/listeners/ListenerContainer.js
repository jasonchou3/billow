export default (Super) => class ListenerContainer extends Super {
    event_listeners = {};

    initListeners(map) {
        this.event_listeners = map;
    }

    async event_fire(event_name, args = []) {
        const listeners = this.event_listeners[event_name];

        if (listeners && listeners.length) {

            listeners.map(listener => {
                const listenerClazz = require(this.listenerPath + '/' + listener).default;

                const instance = new listenerClazz();
                instance.handle(event_name, args)
            })

        } else
            console.log(`event ${event_name}没有对应listener！`)
    }

    get listenerPath() {
        return this.appPath + '/listeners';
    }
}