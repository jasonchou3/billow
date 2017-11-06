import Provider from '../../libs/framework/providers/EventProvider'

export default class EventProvider extends Provider {
    listeners = {
        'example-event': [
            'ExampleListener'
        ]
    };
}