import * as React from 'react'
import { useState } from "react";
import styles from "./index.scss";
import { Icon } from "@/basis";
import { cx, css } from '@emotion/css'

const Item = ({data, deep=0 }:any) => {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className={styles.item} onClick={()=>setIsOpen(!isOpen)}>
          <span style={{marginLeft: data.children?18*deep:18*(deep+1) }}></span>
        {data.children?<Icon className={css`
            transform:rotate(${isOpen ? '90deg': '0deg'});
        `}>chevron_right</Icon>:null}
        <div>{data.name}</div>
      </div>
      <div style={isOpen?null:{display:'none'}}>
      {data.children && data.children.map((item:any) => (
        <Item key={item.order} data={item} deep={deep+1} />
      ))}
      </div>
    </>
  );
};

export default Item