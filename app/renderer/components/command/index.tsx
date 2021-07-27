import * as React from 'react'
import { createPortal, render } from 'react-dom'
import { fromEventPattern, fromEvent } from 'rxjs'
import Events from './Events'
import CommandWindow from './CommandWindow'


let events = new Events()


export const init = () : void => {
    render( <CommandWindow events={events} />, document.getElementById('command') );
}

export const registered = () => {
    
}

export const openPanel = (command?: string) => {
    events.emit('openPanel', command)
    console.log(command)
}

export const exec = () => {
    
}

export default {
    init,
    openPanel,
    exec,
    registered
}