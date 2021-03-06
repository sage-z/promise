// 只做通讯传输，不做业务处理
import { contextBridge, ipcRenderer } from 'electron';
import repository from './repository'

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