import * as React from 'react';
import Tabs from "./Tabs";

export default () => {

  const handleClick = ()=>{

  }

  return (
    <div>
      <Tabs />
      <div style={{ paddingTop: 32 }}>
        <p>name</p>
        <select>
          <option>GET</option>
          <option>POST</option>
          <option>DETELE</option>
          <option>asdfadf</option>
        </select>
        <input></input>
        <button onClick={()=>console.log(2342)}>send</button>
        <p>Description Headers Params Body Auth Options Pre-request Script Tests</p>
      </div>
    </div>
  );
};
