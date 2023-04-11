import { fromEvent, Observable } from 'rxjs'
const { contextBridge, ipcRenderer } = require('electron')
// import {} from ''
import Store = require('electron-store');

// warehouse

let cache = {}

  export default {
    getUserConfig:() => {

    },
    setUserConfig:() => {

    },
  
    get:(path?, key? )=>{
  //     const a  = new Store({
  //       name:'repository',
  //       encryptionKey: 'promise',
  // });

      // console.log(api.name)

  // var observable = new Observable(function subscribe(observer) {
  //   var id = setInterval(() => {
  //     observer.next('hi')
  //   }, 1000);
  // });
  //     return observable
    },
    set:(path, { key , data })=>{

    }
} 