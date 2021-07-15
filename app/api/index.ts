
const { contextBridge, ipcRenderer } = require('electron')
import books from './books'

const Api = {
  getProjectName: async (callback) => {
      return new Promise((resolve,reject)=>{
          ipcRenderer.once('getProjectName', function(event, params){
              if(callback) callback(params);
              resolve(params);
          })
      })
      
  },
  ...books
}

contextBridge.exposeInMainWorld(
  'api', Api
)
