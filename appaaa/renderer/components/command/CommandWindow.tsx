import * as React from "react";
import { useState, forwardRef, useRef, useImperativeHandle } from "react";
import { Input } from "antd";
import Events from './Events'
import Commands from './Commands'

const CommandWindow = ({ events, commands }: {
  events: Events,
  commands: Commands
}) => {
  const inputRef = React.useRef<any>(null);
  const [isShow, setShow] = useState(false);
  const [text, setText] = useState("");
  const [list, setList] = useState(commands.getList());

  React.useEffect(() => {
    const listener = (item) => {
      setText(item);
      setShow(true);
      inputRef.current!.focus({
        cursor: "end",
      });
    };
    events.addEventListener("openPanel", listener);
    return () => events.removeEventListener("openPanel", listener);
  }, []);

  // React.useEffect(() => {
  //   commands.getList()
  // }, []);

  const onPressEnter = (i) => {
    commands.exec(text)
    setText("");
    setShow(false);
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          background: "rgba(50,50,50,.3)",
          zIndex: isShow ? 998 : -1,
          width: "100%",
          height: "100%",
        }}
        onClick={() => {
          setText("");
          setShow(false);
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          zIndex: isShow ? 999 : -1,
          top: "30px",
          margin: "auto",
          right: 0,
          left: 0,
          width: "600px",
          padding: "5px",
          background: "rgba(50,50,50,.1)",
        }}
      >
        <Input
          size="small"
          onChange={(e) => {
            const { value } = e.target;
            setText(value);
            setList(commands.getList().filter(item => item.command.indexOf(value) !== -1));
          }}
          value={text}
          ref={inputRef}
          style={{
            background: "rgba(250,250,250,.8)",
          }}
          onPressEnter={onPressEnter}
        ></Input>
        <div style={{ maxHeight: 350, marginTop: 5 }}>
          {list.map(item => <div key={item.command}>{item.command} <i>{item.paramDesc}</i></div>)}

        </div>
      </div>
    </>
  );
};

export default CommandWindow;
