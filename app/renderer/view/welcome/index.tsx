import * as React from 'react'
import { useState, useEffect } from 'react'
import { render } from 'react-dom'
import EmptyLayout from '@/layouts/EmptyLayout'
import banner from './youknow.jpg'
import command from '@/components/command'
import { getDatabase } from '@/db'

const App = () => {


    const a = aaa()
  useEffect(()=>{
    // const fetchData = async () => {
    //   const data = await getData();
    //   setData(data);
    // };
    // fetchData();
    getDatabase()
    .then(db => {
      db.repositorys
      .find()
      .$ // <- returns observable of query
      .subscribe( docs => {
        console.log(docs)
      });

    })
  
  }, [])

  return (
    <EmptyLayout title="welcome">
        <div style={{
            flex: 1,
            display: 'flex',
            padding: '50px 80px'
        }}>
            <div style={{flex: 1}}>
                <h1>Promise</h1>

                <h3>Start {a}</h3>
                <h5><a onClick={()=>command.openPanel("repository create ")}>新建</a></h5>
                <a onClick={()=>console.log("2121323")}>打开</a>
                <h5><a onClick={()=>console.log("asdf")}>克隆</a></h5>
                <h3>Recent</h3>
                {[1,2,3,4,5,6].map(item => <a key={item}>{item}</a>)}
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

const aaa = () => {
  const [a, as] =useState('nullaaa')
  useEffect(
    () => {
      let b = 0
      setInterval(()=>{
        b++
        console.log(b)
        as( b + "")
      }, 1000)
    },
    [],
  );

  return a
}