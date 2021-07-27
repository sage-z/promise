class Events {

    listeners = new Map<string, Function[]>()

    constructor(){

    }

    get length(){
        return this.listeners.size
    }

    addEventListener(name:string, listener: Function){
        if (!this.listeners.has(name)) this.listeners.set(name, [])
        // console.log('this.listeners.get(name)', this.listeners.get(name))
        const listeners = [...this.listeners.get(name), listener]
        // console.log(listeners)
        this.listeners.set(name, listeners)
        // console.log(name,this.listeners.get(name))
    }
    removeEventListener(name:string, listener?: Function){
        // console.log('removeEventListener', name)
        if(listener){
            const listeners = this.listeners.get(name).filter(l => l !== listener)
            this.listeners.set(name, listeners)
        } else {
            this.listeners.delete(name)
        }
    }
    emit(name:string, ...arg){
        // console.log('name', name, this.listeners.get(name))
        this.listeners.get(name).forEach(f => f(...arg))
    }
}

export default Events