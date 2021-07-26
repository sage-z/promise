
const { contextBridge, ipcRenderer } = require('electron');
const fs = require("fs")
import local from './local'
import repository from './repository'
// import { Books } from 'main/store'
let cache = {
  path: ""
}

let api = {
  getProjectName: async (callback) => {
    // console.log(fs)
      return new Promise((resolve,reject)=>{
          ipcRenderer.once('getProjectName', function(event, params){
              if(callback) callback(params);
              resolve(params);
          })
      })
      
  },
  getConfig:()=>{

  },
  repository: {
    getAll: ()=>{},
    init: ()=>repository.init(),
    open: ()=>{},
    clone: ()=>{},
  },
  local: {
    set: ()=> {
      return name
    }
  }
}




contextBridge.exposeInMainWorld(
  'api', api
)