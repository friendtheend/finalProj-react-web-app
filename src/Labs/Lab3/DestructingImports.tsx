import React from "react";
import Math, { add, subtract, multiply, divide } from "./Math";
// comment for above: add function is export function not export default function
// use { } to import it
import * as Matematica from "./Math";
// comment for above: 导入模块中的所有导出内容，并将它们绑定到一个对象 Matematica 上
export default function DestructingImports() {
  return (
    <div id="wd-destructuring-imports">
      <h2>Destructing Imports</h2>
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Math</th>
            <th>Matematica</th>
            <th>Functions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Math.add(2, 3) = {Math.add(2, 3)}</td>
            <td>Matematica.add(2, 3) ={Matematica.add(2, 3)}</td>
            <td>add(2, 3) = {add(2, 3)}</td>
          </tr>
          <tr>
            <td>Math.subtract(5, 1) = {Math.subtract(5, 1)}</td>
            <td>Matematica.subtract(5, 1) = {Matematica.subtract(5, 1)}</td>
            <td>subtract(5, 1) = {subtract(5, 1)}</td>
          </tr>
          <tr>
            <td>Math.mutiply(3, 4) = {Math.multiply(3,4)}</td>
            <td>Mathematica.mutiply(3, 4) = {Matematica.multiply(3,4)}</td>
            <td>mutiply(3, 4) = {multiply(3,4)}</td>
          </tr>
          <tr>
            <td>Math.divide(8, 2) = {Math.divide(8, 2)}</td>
            <td>Matematica.divide(8, 2) ={Matematica.divide(8, 2)}</td>
            <td>divide(8, 2) = {divide(8, 2)}</td>
          </tr>
        </tbody>
      </table>
      <hr />
    </div>
  );
}
