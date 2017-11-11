import Provider from '../../libs/framework/providers/EventsProvider'

export default class EventsProvider extends Provider {
    listeners = {
        'example-event': [
            'ExampleListener'
        ]
    };
}