import { app, BrowserWindow } from 'electron';
import {is} from 'electron-util';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

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
          preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      }
    });
  
    win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    // win.on('ready-to-show',()=>{
    //     win.show();
    // })
  
    // todo 暂时方案
    win.on('resize', () => {
      win.reload();
    })
  
    win.webContents.on('did-finish-load', () => {
      win.webContents.send('getProjectName', name);
    })
    
    
    if (is.development){
      win.webContents.openDevTools();
    }
    return win
  };