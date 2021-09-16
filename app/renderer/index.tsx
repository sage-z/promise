import * as React from 'react'
import { useState } from 'react'
import { render } from 'react-dom'

import renderApp from './view/app'
import renderWelcome from './view/welcome'
import Mousetrap from 'mousetrap';
import { getDatabase } from './db';
import './public/css/font.css'
import './public/css/antd.min.css'
import command from '@/components/command'

command.init()
// localStorage.setItem('allRepositorys', )
// console.log(command)
Mousetrap.bind('command+shift+k', function() {
    
});

(async function run() {
    // 初始化数据库

    await getDatabase();

    const name = await api.getProjectName();

    if(name){
        renderApp(name)
    } else {
        renderWelcome();
    }

})();
