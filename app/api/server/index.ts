import { ipcMain } from "electron"
import object from './books'


export const initApiServer = () => {
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            const element = object[key];
            
            ipcMain.handle(key, element)
        }
    }

}