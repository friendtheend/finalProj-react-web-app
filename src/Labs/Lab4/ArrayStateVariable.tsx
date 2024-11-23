import React, { useState } from "react";
export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };
//   遍历数组，生成一个新数组，排除掉索引为 index 的那个元素。
  const deleteElement = (index: number) => {
    setArray(array.filter((item, i) => i !== index));
  };
  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>
      <button onClick={addElement}>Add Element</button>
      {/* 下面这个是展示array中有的item */}
      {/* map 根据数组中的元素顺序来生成新的列表项 */}
      <ul>
        {array.map((item, index) => (
          <li key={index}>
            {item}
            <button
              onClick={() => deleteElement(index)}
              id="wd-delete-element-click"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
}
