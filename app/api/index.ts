
const { contextBridge, ipcRenderer } = require('electron')
import books from './books'
import { Books } from 'main/store'

const Api = {
  getProjectName: async (callback) => {
      return new Promise((resolve,reject)=>{
          ipcRenderer.once('getProjectName', function(event, params){
              if(callback) callback(params);
              resolve(params);
          })
      })
      
  },
  Books,
  ...books
}

contextBridge.exposeInMainWorld(
  'api', Api
)
