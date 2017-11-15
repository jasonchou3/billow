import Listener from '../../../framework/src/listeners/Listener'

export default class ExampleListener extends Listener {
    handle(name, args) {
        console.log(name)
        console.log(args)
    }
}