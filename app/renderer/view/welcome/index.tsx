import * as React from 'react'
import { useState, useEffect } from 'react'
import { render } from 'react-dom'
import EmptyLayout from '@/layouts/EmptyLayout'
import banner from './youknow.jpg'
import command from '@/components/command'
import { getDatabase } from '@/db'

const App = () => {


    const repositorys = queryRepositorys()

  return (
    <EmptyLayout title="welcome">
        <div style={{
            flex: 1,
            display: 'flex',
            padding: '50px 80px'
        }}>
            <div style={{flex: 1}}>
                <h1>Promise</h1>

                <h3>Start</h3>
                <h5><a onClick={()=>command.openPanel("repository create ")}>新建</a></h5>
                <a onClick={()=>console.log("2121323")}>打开</a>
                <h5><a onClick={()=>console.log("asdf")}>克隆</a></h5>
                <h3>Recent</h3>
                {repositorys.map(item => <div><a key={item}>{item}</a></div>)}
                <h3>Help</h3>
            </div>
            <div style={{flex: 1}}>
                <img width="100%" src={banner}></img>
                <h3>学习</h3>
                <a href="https://semver.org/lang/zh-CN/">版本</a>

            </div>
        </div>
    </EmptyLayout>
  );
};

export default function () {
  render(<App />, document.getElementById("root"));
}

const queryRepositorys = () => {
  const [ repositorys, setRepositorys] =useState([])

  useEffect(()=>{
    getDatabase()
    .then(db => {
      db.repositorys
      .find()
      .$ // <- returns observable of query
      .subscribe( docs => {
        setRepositorys(docs)
      });
    })
  
  }, [])

  return repositorys
}