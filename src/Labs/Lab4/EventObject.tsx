import React, { useState } from "react";

export default function EventObject() {
// useState 是一个钩子来声明一个状态变量 event，初始值为 null
  const [event, setEvent] = useState(null);
//   setEvent 是一个函数，用于更新 event 的值
  const handleClick = (e: any) => {
    e.target = e.target.outerHTML;
    delete e.view;
    setEvent(e);
  };

  return (
    <div>
      <h2>Event Object</h2>
      <button
        onClick={(e) => handleClick(e)}
        className="btn btn-primary"
        id="wd-display-event-obj-click"
      >
        Display Event Object
      </button>
      <pre>{JSON.stringify(event, null, 2)}</pre>
      <hr />
    </div>
  );
}
