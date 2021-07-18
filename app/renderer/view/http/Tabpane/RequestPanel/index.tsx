import * as React from "react";
import Tabs from "@/components/tabs";
const { TabPane } = Tabs;

export default ()=>{

    return (
        <Tabs
          animated={false}
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
        )
}