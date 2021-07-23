import * as React from 'react'
import { useState } from 'react'
import { render } from 'react-dom'

import initRenderer from './initRenderer'
import renderWelcome from './view/welcome'
import Mousetrap from 'mousetrap';
import './public/css/font.css'
import './public/css/antd.min.css'


Mousetrap.bind('command+shift+k', function() { console.log('command shift k'); });

// function handleKeyPress(event) {
//     // 你可以把处理按键按下事件的代码放在这里。
//     // document.getElementById("last-keypress").innerText = event.key;
//     console.log(event);
//   }
  
//   window.addEventListener('keyup', handleKeyPress, true);

(async function run() {
    console.log('api', api)
    console.log('window', window)
    // 获取初始化配置
    const name = await api.getProjectName();
    if(name){
        initRenderer(name)
    } else {
        renderWelcome();
        // setInterval(()=>initRenderer('test'), 6000)
    }

})();
