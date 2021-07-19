import * as React from "react";
import { useState, useEffect } from "react";
import { Input, Select, Collapse, Spin } from "antd";
const { Panel } = Collapse;
import Tabs from "@/components/tabs";
import { fromEvent } from 'rxjs'
const { TabPane } = Tabs;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export default ({request={
  headers:{
    general:[],
    response:[],
    request:[],
  },
  response: ""
}}:any) => {


  const [containerHeight, setHeight] = useState(604);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(document.body.clientHeight)
    setHeight(document.body.clientHeight - 196)
    let resize = fromEvent(window, 'resize');
    let o = resize.subscribe(x => {
      setHeight(document.body.clientHeight - 196)
      // setHeight(document.body.clientHeight-44)
    });
    return o.unsubscribe
  },[]);
  
  const renderHeadersLines = (arr) => {
    if(!arr || !arr.length){
      return null
    }
    return arr.map(item => <div key={item.key}><b>{item.key}</b>{item.value}</div>)
  }
    return (
        <Tabs
          animated={false}
          centered
          size="small"
        >
          <TabPane tab="Headers" key="Headers"
          style={{height:containerHeight, overflowY:'auto'}}
          >
            <Collapse defaultActiveKey={["1","2","3"]} ghost>
              <Panel header="General" key="1">
                {renderHeadersLines(request.headers.general)}
              </Panel>
              <Panel header="Response Headers" key="2">
                {renderHeadersLines(request.headers.response)}
              </Panel>
              <Panel header="Request Headers" key="3">
                {renderHeadersLines(request.headers.request)}
              </Panel>
            </Collapse>
          </TabPane>
          <TabPane tab="Preview" key="Preview">

          <Spin spinning={loading} delay={500}>
            {/* {container} */}
            <div>asdfasdf</div>
          </Spin>
          </TabPane>
          <TabPane tab="Response" key="Response"
          style={{height:containerHeight, overflowY:'auto'}}>{request.response}</TabPane>
          <TabPane tab="Timing" key="Timing"
          style={{height:containerHeight, overflowY:'auto'}}></TabPane>
          <TabPane tab="Cookies" key="Cookies"
          style={{height:containerHeight, overflowY:'auto'}}></TabPane>
        </Tabs>)
}