
import { app, BrowserWindow, dialog } from 'electron';
import git from 'isomorphic-git'
import { resolve, join } from 'path'
import http from 'isomorphic-git/http/node'
import * as fs from 'fs'

export default {
    create : (name) => {
        let dir = resolve(app.getPath('userData'), 'repository', name )
        return git.init({ fs, bare: true, dir, gitdir: join(dir,'.git'), defaultBranch: 'main' })
    },
    open : () => {
        return dialog.showOpenDialog({
            properties: ['openDirectory', 'createDirectory']
        })
    },
    clone : (url) => {
        let dir = resolve(app.getPath('userData'), 'repository', 'test2')
        return git.clone({ fs, http, dir, url })
    }
}