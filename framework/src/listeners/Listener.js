import Context from '../Context'

export default class Listener extends Context {
    handle() {

        console.log(arguments)
    }
}