import * as React from 'react'
import { useState } from 'react'
import { render } from 'react-dom'

import initRenderer from './initRenderer'
import renderWelcome from './view/welcome'

import './public/css/font.css'
import './public/css/antd.min.css'

(async function run() {
    console.log('api', api)
    // 获取初始化配置
    const name = await api.getProjectName();
    if(name){
        initRenderer(name)
    } else {
        renderWelcome();
        // setInterval(()=>initRenderer('test'), 6000)
    }

})();
