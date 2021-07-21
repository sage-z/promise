import * as React from 'react'
import { useState } from 'react'
import { render } from 'react-dom'
import EmptyLayout from '@/layouts/EmptyLayout'
// import banner = require('../../public/icon/21.png')

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
                <h3>Recent</h3>
                <h3>Help</h3>
            </div>
            <div style={{flex: 1}}>
                <img src="../../public/icon/21.png"></img>

            </div>
        </div>
    </EmptyLayout>
  );
};

export default function AppRender() {
  render(<App />, document.getElementById("root"));
}
