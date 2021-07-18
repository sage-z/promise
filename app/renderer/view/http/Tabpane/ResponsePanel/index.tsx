import * as React from "react";
import { useState } from "react";
import { Input, Select, Collapse } from "antd";
const { Panel } = Collapse;
import Tabs from "@/components/tabs";
const { TabPane } = Tabs;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export default ({request}:{request:any[]}) => {
    const data = request[request.length-1]
    console.log(data)
    return (
        <Tabs
          animated={false}
          centered
          size="small"
        >
          <TabPane tab="Headers" key="Headers">
            <Collapse defaultActiveKey={["1"]} ghost>
              <Panel header="General" key="1">
                {data.headers.general.length?data.headers.general.map(item => <div key={item.key}>{item.value}</div>):null}
              </Panel>
              <Panel header="Response Headers" key="2">
                {data.headers.response.length?data.headers.response.map(item => <div key={item.key}>{item.value}</div>):null}
              </Panel>
              <Panel header="Request Headers" key="3">
                {data.headers.request.length?data.headers.request.map(item => <div key={item.key}>{item.value}</div>):null}
              </Panel>
            </Collapse>
          </TabPane>
          {/* <TabPane tab="Preview" key="Preview"></TabPane> */}
          <TabPane tab="Response" key="Response">{data.response}</TabPane>
          <TabPane tab="Timing" key="Timing"></TabPane>
          <TabPane tab="Cookies" key="Cookies"></TabPane>
        </Tabs>)
}