import * as React from 'react'
import { useRef, useState } from 'react';
import {Icon, Button} from "@/components";
import { cx, css } from '@emotion/css'

export default ({
  children, // 两列布局
}:any) => {

  return (
    <div style={{width:'50px', position:'relative', background: '#555'}}>
      <div style={{
          position: 'absolute',
          top: 0,
          left: 0
          }}>
        {[
          'chrome_reader_mode',
        ].map((item, index)=> <Button key={index} className={css`
          display: block;
          width: 36px;
          margin: 12px 7px;
          height: 36px;
        `}>
          <Icon style={{fontSize:36}}>chrome_reader_mode</Icon>
        </Button>)}
      </div>
        
      
      <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0
          }}> 
        
      {[
          'chrome_reader_mode',
        ].map((item, index) => <Button key={index} className={css`
          display: block;
          width: 36px;
          margin: 12px 7px;
          height: 36px;
        `}>
          <Icon style={{fontSize:36}}>account_circle</Icon>
        </Button>)}
      </div>
      </div>
  );
}
