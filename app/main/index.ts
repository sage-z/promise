import { app, BrowserWindow } from 'electron';
import Store = require("electron-store");
import { createWindow } from './createWindow'
import './bootstrap'

if (require('electron-squirrel-startup')) {
  app.quit();
}
const windows = [];

app.on('ready', async ()=>{
  const store = new Store({ name:'cache', encryptionKey:'promise'})
  const activeWindow : string[] = store.get('activeWindow', []) as string[]
  console.log('activeWindow', activeWindow)
  if(activeWindow.length){
    for (let index = 0; index < activeWindow.length; index++) {
      const element = activeWindow[index];
      let win  = createWindow(element)
      windows.push(win);
    }

  } else{
    let win  = createWindow()
    windows.push(win);
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
