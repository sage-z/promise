import * as React from 'react'
import { useState } from "react";
import styles from "./index.scss";
import Item from "./item";
import { cx, css } from '@emotion/css'

export default () => {

  const menu: any[] = [
    { name: "asdfasf", order: 1 },
    {
      name: "asdfasf",
      order: 2,
      children: [
        {
          name: "asdfasf",
          order: 1,
          children: [
            { name: "2534234", order: 1 },
            { name: "23452", order: 2 },
            { name: "2345", order: 3 },
            { name: "2345", order: 4 },
          ],
        },
        { name: "asdfasf", order: 2 },
        { name: "asdfasf", order: 3 },
        { name: "asdfasf", order: 4 },
      ],
    },
    { name: "asdfasf", order: 3 },
    { name: "asdfasf", order: 4 },
    { name: "asdfasf", order: 5 },
    { name: "asdfasf", order: 6 },
  ];

  return (
    <div className={styles.side}>
        {menu.sort((a,b)=> a.order-b.order).map((item, index) => (
          <Item key={item.order} data={item} />
        ))}
    </div>
  );
};
