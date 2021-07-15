import { initApiServer } from '../api/server';
// import Store = require('electron-store');

(async () => {
    try {
        initApiServer()
    } catch (error) {
        console.log('error', error)
    }
})()


// 我什么都没有了