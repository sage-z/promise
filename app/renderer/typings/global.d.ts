import {IpcRenderer, Clipboard, ContextBridge, CrashReporter, DesktopCapturer, NativeImage, Shell, WebFrame, Deprecate} from 'electron';
 
declare global {
  declare var MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY:string
  declare var MAIN_WINDOW_WEBPACK_ENTRY:string
  // interface Window {
  //   clipboard: Clipboard
  //   contextBridge: ContextBridge
  //   crashReporter: CrashReporter
  //   desktopCapturer: DesktopCapturer
  //   ipcRenderer: IpcRenderer
  //   nativeImage: NativeImage
  //   shell: Shell
  //   webFrame: WebFrame
  //   deprecate: Deprecate
  //   // require: (module: 'electron') : > {
  //   //   ipcRenderer: IpcRenderer
  //   // };
  // }
  var api: {
    getProjectName: (callback?: any) => Promise<any>
    get_books: (callback?: any) => Promise<any>
    add_books: (callback?: any) => Promise<any>
  };
}
