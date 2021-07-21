
const { contextBridge, ipcRenderer } = require('electron')
import local from './local'
// import { Books } from 'main/store'

const api = {
  getProjectName: async (callback) => {
      return new Promise((resolve,reject)=>{
          ipcRenderer.once('getProjectName', function(event, params){
              if(callback) callback(params);
              resolve(params);
          })
      })
      
  },
  local
}




contextBridge.exposeInMainWorld(
  'api', api
)