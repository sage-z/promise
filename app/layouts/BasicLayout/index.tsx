// 拖拽组件
// 考察了 [react-grid-layout](https://www.npmjs.com/package/react-grid-layout) 觉得不太适合
// 选用自 https://github.com/Lemonreds/react-components/blob/0a8955eabdcb44fcfce82f480f434bf294947b5a/src/components/DraggleLayout/DraggleLayout.jsx

import * as React from 'react'
import { useRef, useState, useEffect } from "react";
import useDraggable from "hooks/useDraggable";
import styles from "./index.scss";
import { cx, css } from "@emotion/css";
import { queryBooks } from "service/books";
// import { Books } from '../../database/store'

export function DraggleLayout({
  children, // 两列布局
  max = Infinity, // 左侧最大宽度
  containerWidth = 0, // 容器宽度
  containerHeight = 0, // 容器高度
  initLeftWidth = 0, // 初始左侧容器宽度
  onWidthChange = (width: number | string) => width, // 左侧容器高度变化
}: any) {
  const ref = useRef(null);

  const [showProjectList, setShowProjectList] = useState(false);
  const [position, setPosition] = useState({ x: initLeftWidth, y: 0 });

  const [props] = useDraggable(
    ref,
    {
      onMouseMove: ({ x, y }: any) => {
        let _x = x;
        console.log(containerWidth);
        // if (_x < min) _x = min;
        if (_x < 50) _x = 0;
        if (_x > max) _x = max;
        if (onWidthChange) onWidthChange(_x);
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
      background: "rgb(77, 81, 100)",
    }}
  />

  // const useObservable = (observable, setter) => {
    
  // };
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    queryBooks()
    api.get_books()
    .then(data => setBookList(data))
    
    // console.log('Books.store', Books.store)
    // let subscription = queryBooks().subscribe((result:any[]) => {
    //   // setBookList(result);
    //   console.log(result)
    // });
    // return () => subscription.unsubscribe();
  }, []);

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
                // api.get_books().then(data => console.log(data))
                console.log(bookList)
                setShowProjectList(true)}}
            ></div>
            <div
              className={css`
                height: 100%;
              `}
            >
              {children[0]}
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
        {children[1] ? children[1] : <div></div> }
      </div>
    </div>
  );
}

export default DraggleLayout;
