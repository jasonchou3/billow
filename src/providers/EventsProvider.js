import Provider from '../../framework/src/providers/EventsProvider'

export default class EventsProvider extends Provider {
    listeners = {
        'example-event': [
            'ExampleListener'
        ]
    };
}