// import isDev = require('electron-is-dev');
const isElectron = 'electron' in process.versions;

// const electron = require('electron');

// if (typeof electron === 'string') {
// 	throw new TypeError('Not running in an Electron environment!');
// }

const isEnvSet = 'ELECTRON_IS_DEV' in process.env;
const getFromEnv = Number.parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;

console.log('isEnvSet', isEnvSet, getFromEnv)

export const macos = process.platform === 'darwin'
export const linux = process.platform === 'linux'
export const windows = process.platform === 'win32'
export const main = process.type === 'browser'
export const renderer = process.type === 'renderer'
export const usingAsar = isElectron && process.mainModule && process.mainModule.filename.includes('app.asar')
export const development = isEnvSet ? getFromEnv : false
export const macAppStore = process.mas === true
export const windowsStore = process.windowsStore === true
