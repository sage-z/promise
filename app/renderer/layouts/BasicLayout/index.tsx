import * as React from 'react'
import { Component, useState, useEffect } from "react";
import {render} from 'react-dom';
import Footer from "../components/Footer";
// import BasicLayout from "layouts/BasicLayout";
// import Sidebar from "./Sidebar";
// import Tabpane from "./Tabpane";
import Navigation from '../components/Navigation';
import baseStyles from "@/scss/base.scss";
import barsStyles from "@/scss/bars.scss";
import gridStyles from "@/scss/grid.scss";

export default ({children}) => {
  const [width, setWidth] = useState(document.body.clientWidth -50);
  useEffect(() => {
    window.onresize = () => {
      setWidth(document.body.clientWidth -50)
    }
  },[]);
  // const width = document.body.clientWidth -50
  return (
    <div className={baseStyles.window}>
      <header
        className={`${barsStyles.toolbar} ${barsStyles["toolbar-header"]}`}
      >
        <h1 className={barsStyles.title}>Header</h1>
      </header>
      <div className={baseStyles["window-content"]}>
        <Navigation />
        <div className={gridStyles["pane-group"]} style={{left:'50px'}}>
            {children}
          {/* <BasicLayout
            containerWidth={width}
            containerHeight={"100%"}
            initLeftWidth={280}
          >
            <Sidebar />
            <Tabpane />
          </BasicLayout> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};