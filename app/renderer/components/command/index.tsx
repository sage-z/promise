import * as React from 'react'
import { Input } from 'antd';
import command from './command'


let notification: any = null;

export const initCommand = () : void => {
    // command.newInstance( {}, ins => notification = ins)

    command.newInstance( {}, ins => console.log(ins))
    command.newInstance( {}, ins => console.log(ins))
    command.newInstance( {}, ins => console.log(ins))
    command.newInstance( {}, ins => console.log(ins))
    command.newInstance( {}, ins => console.log(ins))
    command.newInstance( {}, ins => console.log(ins))
}

export const registeredCommand = () => {
    
}

export const openPanel = (command?: string) => {
    notification.notice({
        content: <span>simple show {String(Date.now()).slice(-5)}</span>,
        onClose() {
          console.log('simple close');
        },
      })
}

export const executedCommand = () => {
    
}



export default {
    initCommand,
    registeredCommand,
    openPanel,
    executedCommand
}


// () => {

//     return <div style={{
//         position: 'absolute',
//         top: '30px',
//         margin: 'auto',
//         right: 0,
//         left: 0,
//         width: '600px',
//         padding: '5px',
//         background: 'rgba(50,50,50,.1)'
//     }}>
//         <Input size="small" style={{
//         background: 'rgba(50,50,50,.1)'}}
//         onPressEnter={()=>{}}></Input>
//         <div>

//         </div>



        
//     </div>
// }