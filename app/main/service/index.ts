// 暂时不知道需要提供什么服务，先这么写，等大概确定了再分模块
import { ipcMain } from 'electron'
import git from './git'

ipcMain.on('repo', (event, message)=> {
    switch (message.key) {
        case 'create':
            git.create(message.name)
            break;
        case 'open':
            git.open()
            break;
        case 'clone':
            git.clone('https://github.com/isomorphic-git/lightning-fs')
            break;
        default:
            break;
    }
})