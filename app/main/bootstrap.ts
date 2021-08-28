// import { initApiServer } from '../api/server';
import './service';
import Store = require('electron-store');

(async () => {
    try {
        Store.initRenderer()
    } catch (error) {
        console.log('error', error)
    }
})()


// 我什么都没有了