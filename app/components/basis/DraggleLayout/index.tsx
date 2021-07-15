// 拖拽组件
// 考察了 [react-grid-layout](https://www.npmjs.com/package/react-grid-layout) 觉得不太适合
// 选用自 https://github.com/Lemonreds/react-components/blob/0a8955eabdcb44fcfce82f480f434bf294947b5a/src/components/DraggleLayout/DraggleLayout.jsx
import * as React from 'react'
import { useRef, useState } from 'react';
import useDraggable from 'hooks/useDraggable';
import styles from './index.scss';

export function DraggleLayout({
  children, // 两列布局
  max = Infinity, // 左侧最大宽度
  containerWidth = 0, // 容器宽度
  containerHeight = 0, // 容器高度
  initLeftWidth = 0, // 初始左侧容器宽度
  handler = null, // 拖拽器
  onWidthChange = (width: number|string) => width, // 左侧容器高度变化
}:any) {
  const ref = useRef(null);

  const [position, setPosition] = useState({ x: initLeftWidth, y: 0 });

  const [props] = useDraggable(
    ref,
    {
      onMouseMove: ({ x, y }:any) => {
        let _x = x;
        console.log(containerWidth)
        // if (_x < min) _x = min;
        if ( _x < 50 ) _x = 0;
        if (_x > max) _x = max;
        if (onWidthChange) onWidthChange(_x);
        setPosition({ x: _x, y });
      },
    },
    { overbound: false },
  );
  const _handler = handler ? (
    React.cloneElement(handler, {
      ...handler.props,
      style: {
        ...handler.props.style,
        pointerEvents: 'none',
      },
    })
  ) : (
    <span style={{ fontSize: 18, pointerEvents: 'none' }}>》</span>
  );

  return (
    <div
      ref={ref}
      className={styles.root}
      style={{ width: containerWidth, height: containerHeight }}
    >
      <div className={styles.left} style={{ width: position.x }}>
        {children[0]}

        <div className={styles.handler} {...props}>
          {_handler}
        </div>
      </div>
      <div
        className={styles.right}
        style={{ width: containerWidth - position.x }}
      >
        {children[1]?children[1]:null}
      </div>
    </div>
  );
}

export default DraggleLayout;