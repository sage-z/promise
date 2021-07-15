import { Observable } from 'rxjs'
const { contextBridge, ipcRenderer } = require('electron')


  export default {
    get_books: (someArgument) => {
      return ipcRenderer.invoke('get_books', someArgument)
      // return new Observable(observer=>{
      //   const EVENT_NAME = ''
      //   const listener = (event, params)=>{
  
      //     observer.next(params);
      //   }
  
      //   ipcRenderer.send('subscribe', )
      //   ipcRenderer.on(EVENT_NAME, listener)
      //   return () => {
      //     ipcRenderer.removeListener(EVENT_NAME, listener)
      //   }
      // })
    },
  
    add_books:(someArgument)=>{
      return ipcRenderer.invoke('add_books', someArgument)
    }
  } 