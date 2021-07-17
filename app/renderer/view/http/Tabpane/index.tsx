import * as React from "react";
import { useState } from "react";
// import Tabs from "./Tabs";
import Tabs from "@/components/tabs";
import axios from "axios";
import { DraggleLayout } from "@/components";
const { TabPane } = Tabs;
import { Input, Select,Collapse } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
const { Search } = Input
const { Panel } = Collapse;
const { Option } = Select;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const selectBefore = (
  <Select defaultValue="GET" className="select-before">
    <Option value="GET">GET</Option>
    <Option value="POST">POST</Option>
  </Select>
);
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
export default (props) => {

  // console.log(props)
  let [activeKey, setActiveKey] = useState(initialPanes[0].key);
  let [panes, setPanes] = useState(initialPanes);

  const onChange = (activeKey) => {
    setActiveKey(activeKey);
    axios.get("http://www.baidu.com").then((data) => console.log(data));
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
    // this[action](targetKey);
  };

  const add = () => {
    const activeKey = `newTab${+new Date()}`;
    const newPanes = [...panes];
    newPanes.push({
      title: "New Tab",
      content: "Content of new Tab",
      key: activeKey,
    });
    setActiveKey(activeKey);
    setPanes(newPanes);
  };

  const remove = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setActiveKey(activeKey);
    setPanes(newPanes);
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
        {panes.map((pane) => (
          <TabPane tab={pane.title} key={pane.key}></TabPane>
        ))}
      </Tabs>

      {/* <div> */}
        {/* <select>
          <option>GET</option>
          <option>POST</option>
          <option>DETELE</option>
          <option>asdfadf</option>
        </select>
        <input></input>
        <button onClick={() => console.log(2342)}>send</button> */}
        <Search addonBefore={selectBefore}  enterButton="Send" style={{ width:'90%', margin: "0 auto 10px"}} />
        {/* </div> */}
          <DraggleLayout
            containerWidth={props.width}
            containerHeight={"100%"}
            initLeftWidth={Math.round(props.width/2)}
            handler={<div
              style={{
                width: 1,
                height: "100%",
                pointerEvents: "none",
                background: "rgb(200, 200, 200)",
              }}
            />}
          >
            <Tabs
              animated={false}
              onChange={onChange}
              activeKey={activeKey}
              centered
              size="small"
            >
              <TabPane tab="Description" key="Description"></TabPane>
              <TabPane tab="Headers" key="Headers"></TabPane>
              <TabPane tab="Params" key="Params"></TabPane>
              <TabPane tab="Body" key="Body"></TabPane>
              <TabPane tab="Auth" key="Auth"></TabPane>
              <TabPane tab="Options" key="Options"></TabPane>
              <TabPane tab="Pre-request Script" key="Script"></TabPane>
              <TabPane tab="Tests" key="Tests"></TabPane>
            </Tabs>
            <Tabs
              animated={false}
              onChange={onChange}
              activeKey={activeKey}
              centered
              size="small"
            >
              <TabPane tab="Headers" key="Headers">

  <Collapse defaultActiveKey={['1']} ghost>
    <Panel header="General" key="1">
      <p>{text}</p>
    </Panel>
    <Panel header="Response Headers" key="2">
      <p>{text}</p>
    </Panel>
    <Panel header="Request Headers" key="3">
      <p>{text}</p>
    </Panel>
  </Collapse>
              </TabPane>
              <TabPane tab="Preview" key="Preview"></TabPane>
              <TabPane tab="Response" key="Response"></TabPane>
              <TabPane tab="Initator" key="Initator"></TabPane>
              <TabPane tab="Timing" key="Timing"></TabPane>
            </Tabs>
          </DraggleLayout>
    </>
  );
};
