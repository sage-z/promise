import * as React from 'react'
import { useState, forwardRef, useRef, useImperativeHandle } from 'react'
import { Input } from 'antd';

const CommandWindow = ({events }) => {
    const inputRef = React.useRef<any>(null);
    const [ isShow, setShow ] = useState(false)
    const [ text, setText ] = useState("")

    const fd = React.useEffect(()=>{
        const listener = (item)=>{
            // console.log('addEventListener', item)
            setText(item)
            setShow(true)
            inputRef.current!.focus({
                cursor: 'end',
              });
        }
        events.addEventListener('openPanel', listener)
        return ()=>events.removeEventListener('openPanel', listener)
    }, [])

    const onPressEnter = (i) => {
        console.log(i)
    }

    return <div style={{
        position: 'absolute',
        zIndex: isShow? 999: -1,
        top: '30px',
        margin: 'auto',
        right: 0,
        left: 0,
        width: '600px',
        padding: '5px',
        background: 'rgba(50,50,50,.1)'
    }}>
        <Input size="small" onChange={(e)=>{
            
            const { value } = e.target;
            console.log(value)
            setText(value)
        }} value={text} 
        ref={inputRef}
        style={{
            background: 'rgba(50,50,50,.1)'}}
            onPressEnter={onPressEnter}></Input>
        <div>
        </div>
    </div>
}

export default CommandWindow