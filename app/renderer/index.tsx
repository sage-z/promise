import * as React from 'react'
import { useState } from 'react'
import { render } from 'react-dom'

import renderApp from './view/app'
import renderWelcome from './view/welcome'
import Mousetrap from 'mousetrap';
import './public/css/font.css'
import './public/css/antd.min.css'
import command from '@/components/command'

command.initCommand()

Mousetrap.bind('command+shift+k', function() {
    
});

(async function run() {

    const name = await api.getProjectName();

    if(name){
        renderApp(name)
    } else {
        renderWelcome();
    }

})();
