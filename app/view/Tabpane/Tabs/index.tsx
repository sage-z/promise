import * as React from 'react'
import { useRef, useState } from 'react';
import styles from "./index.scss";
import { cx, css } from '@emotion/css'

const Tabs = ({
  children, // 两列布局
}:any) => {

  const [ tabList, setTabList] = useState(['1.txt','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf','asdf']);
  // const [ tabList, setTabList] = useState(['1.txt','asdf','asdf','asdf','asdf','asdf']);

  const onClose = (index:number) => {
    let list = [...tabList]
    list.splice(index, 1);
    setTabList(list)
  }

  return (
    <div className={styles.tabs} style={{width:30+2}}>
        <div className={css`
          display: flex;
          background-color: 777;
          transform-origin: left bottom;
          flex-wrap: nowrap; /*禁止换行*/
          transform: translateY(-${30}px) rotateZ(90deg) rotateX(180deg) translateY(${30}px)
        `}>
            {tabList.map((item, index) => <div key={index} className={css`
               width: 100px;
               height: 30px;
               cursor:pointer;
               line-height: 30px;
               flex-shrink: 0; /* 禁止压缩 */
               background-color: #777;
               color: #ddd;
               border-right: 1px solid #555;
               padding: 0 6px;
            `} >{item} 
              <span onClick={()=>onClose(index)} style={{height:20, width:20}}>x</span>
            </div>)}
        </div>
    </div>
  );
}



export default Tabs;