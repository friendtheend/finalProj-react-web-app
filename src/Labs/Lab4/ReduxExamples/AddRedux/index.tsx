import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { add } from "./addReducer";
export default function AddRedux() {
  // 本地状态只能在组件内部使用，而全局状态可以在整个应用中共享和访问。
  // Local State
  const [a, setA] = useState(12);
  const [b, setB] = useState(23);
  // Global State
  const { sum } = useSelector((state: any) => state.addReducer);
  const dispatch = useDispatch();
  return (
    <div className="w-25" id="wd-add-redux">
      <h1>Add Redux</h1>
      <h2>{a} + {b} = {sum}</h2>
      <input type="number" value={a}
        onChange={(e) => setA(parseInt(e.target.value))}
        className="form-control" />
      <input type="number" value={b}
        onChange={(e) => setB(parseInt(e.target.value))}
        className="form-control" />
        {/* Click Add Redux Button, sum value change according a b value */}
      <button className="btn btn-primary" id="wd-add-redux-click"
        onClick={() => dispatch(add({ a, b }))}>
        Add Redux </button>
      <hr/>
    </div>
  );
}
