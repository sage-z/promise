import * as React from 'react'
import { useState } from 'react'
import { render } from 'react-dom'

import initRenderer from './initRenderer'
import renderWelcome from './view/welcome'
import Mousetrap from 'mousetrap';
import './public/css/font.css'
import './public/css/antd.min.css'
import command from '@/components/command'

command.initCommand()

Mousetrap.bind('command+shift+k', function() {
    
});

(async function run() {
    console.log('api', api)
    console.log('window', window)
    // 获取初始化配置
    const name = await api.getProjectName();

    if(name){
        initRenderer(name)
    } else {
        renderWelcome();
    }

})();
