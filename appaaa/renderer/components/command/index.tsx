import * as React from 'react'
import { createPortal, render } from 'react-dom'
import { fromEventPattern, fromEvent } from 'rxjs'
import Events from './Events'
import Commands from './Commands'
import CommandWindow from './CommandWindow'
import repo from './repo'


let events = new Events()
let commands = new Commands()

export const init = () : void => {
    commands.registered(repo.name, repo.command)
    render( <CommandWindow events={events} commands={commands} />, document.getElementById('command') );
}


export const openPanel = (command?: string) => {
    events.emit('openPanel', command)
}

export const registered = commands.registered

export const exec = commands.exec

export default {
    init,
    openPanel,
    exec,
    registered
}