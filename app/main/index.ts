import { app, BrowserWindow } from 'electron';
import { Books } from '../database/store';
import { createWindow } from './createWindow'
import './bootstrap'

if (require('electron-squirrel-startup')) { 
  app.quit();
}
const windows = [];

app.on('ready', async ()=>{
  console.log('Books.store', Books.store)
  let win  = createWindow()
  windows.push(win);

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
