import * as React from 'react'
import { useState } from 'react'
import { render } from 'react-dom'
import EmptyLayout from '@/layouts/EmptyLayout'
import banner from '@/../../docs/youknow.jpg'

const App = () => {
  // const [ component, setComponent ] = useState(Http)

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
                <h5><a onClick={()=>console.log("asdf")}>新建项目</a></h5>
                <a onClick={()=>console.log("2121323")}>新建项目</a>
                <h3>Recent</h3>
                <h5>新建项目</h5>
                <h5>克隆项目</h5>
                <h3>Help</h3>
            </div>
            <div style={{flex: 1}}>
                <img width="100%" src={banner}></img>
                <h3>学习</h3>

            </div>
        </div>
    </EmptyLayout>
  );
};

export default function AppRender() {
  render(<App />, document.getElementById("root"));
}
