import * as React from "react";
import { useState, useEffect } from "react";
import Tabs from "@/components/tabs";
import axios from "@/libs/axios";
import { AxiosResponse } from "axios";

import { DraggleLayout } from "@/components";
const { TabPane } = Tabs;
import { Input, Select } from "antd";
import RequestPanel from './RequestPanel'
import ResponsePanel from './ResponsePanel'
const { Search } = Input;
const { Option } = Select;

const initialPanes = [
  { title: "Tab 1", content: "Content of Tab 1", key: "1" },
  { title: "Tab 2", content: "Content of Tab 2", key: "2" },
  {
    title: "Tab 3",
    content: "Content of Tab 3",
    key: "3",
    closable: false,
  },
];


// 响应类型分 文件  网页   json  xml
// interface IRequest {
//   headers :{
//     general: any
//     response: any
//     requests: any
//   }
//   response: string
//   timing: any
//   cookies: any
// }

export class Request  {
  headers = {
    general: [],
    response: [],
    request: []
  };
  response: string = '';
  timing: object = {};
  cookies: object = {};

  constructor(res?: AxiosResponse){
    if(res){
      const obj = JSON.parse(JSON.stringify(res.config))
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const element = obj[key];
          this.headers.general.push({key, value: element+""})
        }
      }


      for (const key in res.headers) {
        if (Object.prototype.hasOwnProperty.call(res.headers, key)) {
          const element = res.headers[key];
          this.headers.response.push({key, value: element+""})
        }
      }
      // Preview
      this.response=  res.data,
      // Initator,
      this.timing= {},
      this.cookies={}
    }
  }


  isEmpty() {
      return !this.response
  }
}



export default (props) => {

  let [activeApis, setActiveApis] = useState(initialPanes);
  let [activeKey, setActiveKey] = useState(initialPanes[0].key);
  const api = activeApis.filter(item => item.key===activeKey).length?activeApis.filter(item => item.key===activeKey)[0]:{}
  const [requests, setRequests] = useState<Request[]>([new Request()]);


  let [method, setMethod] = useState('GET');
  const onMethodsChange=(value)=>{
    setMethod(value)
    console.log(value)
  }
  const selectBefore = (
    <Select defaultValue="GET" onChange={onMethodsChange} className="select-before">
      <Option value="GET">GET</Option>
      <Option value="POST">POST</Option>
    </Select>
  );



  const onChange = (activeKey) => {
    setActiveKey(activeKey);
  };

  const onSearch = (value="http://www.baidu.com") => {
    if(value==""){
      console.log("空的")
      return 
    }
    if(value.search(/(http|https):\/\/([\w.]+\/?)\S*/i)!==0){
      value="http://"+value
    }
    console.log(value, method)
    axios({url: value, method })
    .then((data) => {
      console.log(data)
      let r = [...requests]
      r.push(new Request(data))
      setRequests(r)
    });
  };

  const onEdit = (targetKey, action) => {
    switch (action) {
      case "add":
        add();
        break;
      case "remove":
        remove(targetKey);
        break;

      default:
        break;
    }
  };

  const add = () => {
    const activeKey = `newTab${+new Date()}`;
    const newPanes = [...activeApis];
    newPanes.push({
      title: "New Tab",
      content: "Content of new Tab",
      key: activeKey,
    });
    setActiveKey(activeKey);
    setActiveApis(newPanes);
  };

  const remove = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex;
    activeApis.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = activeApis.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setActiveKey(activeKey);
    setActiveApis(newPanes);
  };

  return (
    <>
      <Tabs
        animated={false}
        tabBarGutter={0}
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        type="editable-card"
      >
        {activeApis.map((pane) => (
          <TabPane tab={pane.title} key={pane.key} closable={activeApis.length>1?true:false}></TabPane>
        ))}
      </Tabs>
      <Search
        addonBefore={selectBefore}
        onSearch={onSearch}
        enterButton="Send"
        style={{ width: "90%", margin: "0 auto 10px" }}
      />
      <DraggleLayout
        containerWidth={props.width}
        containerHeight={"100%"}
        initLeftWidth={Math.round(props.width / 2)}
        handler={
          <div
            style={{
              width: 1,
              height: "100%",
              pointerEvents: "none",
              background: "rgb(200, 200, 200)",
            }}
          />
        }
      >
        <RequestPanel />
        <ResponsePanel request={requests.length?requests[requests.length-1]:null} />
      </DraggleLayout>
    </>
  );
};
