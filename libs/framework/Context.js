export default class Context {
    static app;

    get app(){
        return this.constructor.app;
    }
}