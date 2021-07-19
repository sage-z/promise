// 拖拽组件
// 考察了 [react-grid-layout](https://www.npmjs.com/package/react-grid-layout) 觉得不太适合
// 选用自 https://github.com/Lemonreds/react-components/blob/0a8955eabdcb44fcfce82f480f434bf294947b5a/src/components/DraggleLayout/DraggleLayout.jsx

import * as React from 'react'
import { useRef, useState, useEffect } from "react";
import useDraggable from "@/hooks/useDraggable";
import styles from "./index.scss";
import { cx, css } from "@emotion/css";
import { queryBooks } from "@/service/books";
import Sidebar from './Sidebar'
import Tabpane from './Tabpane'
import { fromEvent } from 'rxjs'


export function DraggleLayout({
  max = 500, // 左侧最大宽度
  // containerHeight = '100%', // 容器高度
  initLeftWidth = 300, // 初始左侧容器宽度
}: any) {
  const ref = useRef(null);

  const [showProjectList, setShowProjectList] = useState(false);
  const [containerWidth, setWidth] = useState(1230);
  const [containerHeight, setHeight] = useState("100%");
  const [position, setPosition] = useState({ x: initLeftWidth, y: 0 });

  useEffect(() => {
    setWidth(document.body.clientWidth - 50)
    let resize = fromEvent(window, 'resize');
    let o = resize.subscribe(x => {
      setWidth(document.body.clientWidth -50)
      // setHeight(document.body.clientHeight-44)
    });
    return o.unsubscribe
  },[]);

  const [props] = useDraggable(
    ref,
    {
      onMouseMove: ({ x, y }: any) => {
        let _x = x;
        // if (_x < min) _x = min;
        if (_x < 50) _x = 0;
        if (_x > max) _x = max;
        setPosition({ x: _x, y });
      },
    },
    { overbound: false }
  );
  const _handler = <div
    style={{
      width: 1,
      height: "100%",
      pointerEvents: "none",
      background: "rgb(200, 200, 200)",
    }}
  />

  const [bookList, setBookList] = useState([]);

  return (
    <div
      ref={ref}
      className={styles.root}
      style={{ width: containerWidth, height: containerHeight }}
    >
      <div className={styles.left} style={{ width: position.x }}>
        {showProjectList ? (
          <div
            className={css`
              height: 100%;
              background: #333;
            `}
          >
            <div
              className={css`
                width: 100%;
                height: 60px;
                cursor: pointer;
              `}
              onClick={() => setShowProjectList(false)}
            ></div>
            <button>克隆一个</button>
            <button>创建一个</button>
            <button>导入</button>
            <div>
              {bookList.map(item => {
                return <div
                className={css`    
                  height: 80px;
                `} key={item.name} >{item.name}</div>
              })}

            </div>
          </div>
        ) : (
          <div
            className={css`
              height: 100%;
              display: flex;
              flex-flow: column;
            `}
          >
            <div
              className={css`
                width: 100%;
                height: 60px;
                cursor: pointer;
              `}
              onClick={() => {
                setShowProjectList(true)}}
            ></div>
            <div
              className={css`
                height: 100%;
              `}
            >
              <Sidebar />
            </div>
          </div>
        )}

        <div className={styles.handler} {...props}>
          {_handler}
        </div>
      </div>
      <div
        className={styles.right}
        style={{ width: containerWidth - position.x }}
      >
        {showProjectList ? (
          <div
            className={css`
              height: 100%;
              width: 100%;
              background: rgba(0, 0, 0, 0.5);
              z-index: 100;
              position: absolute;
            `}
            onClick={() => setShowProjectList(false)}
          ></div>
        ) : null}
        <Tabpane width={containerWidth - position.x} />
      </div>
    </div>
  );
}

export default DraggleLayout;
