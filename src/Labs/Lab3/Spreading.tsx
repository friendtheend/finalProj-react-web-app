// "spreading"（展开语法）是通过使用 扩展运算符（...）来将一个数组、对象、或其他可迭代对象的元素或属性 "展开"。
// 它允许我们将这些元素或属性插入到新的数组、对象或函数参数中。

export default function Spreading() {
    const arr1 = [ 1, 2, 3 ];
    const arr2 = [ ...arr1, 4, 5, 6 ];
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { ...obj1, d: 4, e: 5, f: 6 };
    const obj3 = { ...obj1, b: 4 };
    return (
      <div id="wd-spreading">
        <h2>Spread Operator</h2>
        <h3>Array Spread</h3>
        arr1 = { JSON.stringify(arr1) }  <br />
        arr2 = { JSON.stringify(arr2) }  <br />
        <h3>Object Spread</h3>
        { JSON.stringify(obj1) }         <br />
        { JSON.stringify(obj2) }         <br />
        { JSON.stringify(obj3) }         <br />  <hr />
      </div>);
   }
   