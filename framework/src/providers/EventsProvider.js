import Provider from './Provider'

export default class EventsProvider extends Provider {
    boot() {
        this.app.initListeners(this.listeners);
    }
}