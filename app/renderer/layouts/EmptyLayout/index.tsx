import * as React from 'react'
// import { Component, useState, useEffect } from "react";
// import {render} from 'react-dom';
// import Footer from "../components/Footer";
// import BasicLayout from "layouts/BasicLayout";
// import Sidebar from "./Sidebar";
// import Tabpane from "./Tabpane";
// import Navigation from '../components/Navigation';
import baseStyles from "@/scss/base.scss";
import barsStyles from "@/scss/bars.scss";
// import gridStyles from "@/scss/grid.scss";

export default ({children, title}) => {
  return (
    <div className={baseStyles.window}>
      <header
        className={`${barsStyles.toolbar} ${barsStyles["toolbar-header"]}`}
      >
        <h1 className={barsStyles.title}>{title}</h1>
      </header>
      {/* <div className={baseStyles["window-content"]}> */}
            {children}
      {/* </div> */}
    </div>
  );
};