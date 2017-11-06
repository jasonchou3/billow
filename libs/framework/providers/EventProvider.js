import Provider from './Provider'

export default class EventProvider extends Provider {
    boot() {
        this.app.initListeners(this.listeners);
    }
}