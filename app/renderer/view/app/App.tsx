import * as React from 'react'
import { useState } from 'react'
import { render } from 'react-dom'
import BasicLayout from '@/layouts/BasicLayout'
// import Http from './http'

const App = () => {
  // const [ component, setComponent ] = useState(Http)

  return (
    <BasicLayout>
      {/* <Http /> */}
    </BasicLayout>
  );
};

export default function AppRender() {
  render(<App />, document.getElementById("root"));
}
