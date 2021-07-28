class Events {

    listeners = new Map<string, Function[]>()

    constructor(){

    }

    get length(){
        return this.listeners.size
    }

    addEventListener(name:string, listener: Function){
        if (!this.listeners.has(name)) this.listeners.set(name, [])
        const listeners = [...this.listeners.get(name), listener]
        this.listeners.set(name, listeners)
    }
    removeEventListener(name:string, listener?: Function){
        if(listener){
            const listeners = this.listeners.get(name).filter(l => l !== listener)
            this.listeners.set(name, listeners)
        } else {
            this.listeners.delete(name)
        }
    }
    emit(name:string, ...arg){
        this.listeners.get(name).forEach(f => f(...arg))
    }
}

export default Events