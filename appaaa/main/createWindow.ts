import { app, BrowserWindow, dialog } from 'electron';
import {is} from 'electron-util';
import Store = require("electron-store");
import { pathToFileURL } from 'url';
import { resolve } from 'path'

export const createWindow = (name?: string): BrowserWindow => {
    const win = new BrowserWindow({
      frame: false,
      // show: false,
      height: 800,
      width: 1280,
      minWidth: 800,
      minHeight: 600,
      titleBarStyle: 'hidden',
      backgroundColor: '#2e2c29',
      webPreferences: {
          devTools: is.development,
          preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
          webSecurity: false,
          allowRunningInsecureContent: false
      }
    });
  
    win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    // win.on('ready-to-show',()=>{
    //     win.show();
    // })

  const store = new Store({ name:'cache', encryptionKey:'promise'})
  const activeWindow : string[] = store.get('activeWindow', []) as string[]
  
    win.webContents.on('did-finish-load', () => {
      if(!activeWindow.includes(name)){
        activeWindow.push(name)
        store.set('activeWindow', activeWindow)
      }
      win.webContents.send('getProjectName', name);
    })

    win.on('closed', ()=>{
      store.set('activeWindow', activeWindow.filter(item => item !== name))
    })
    
    if (is.development){
      win.webContents.openDevTools();
    }
    return win
};