import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterReducer";
export default function CounterRedux() {
  const { count } = useSelector((state: any) => state.counterReducer);
// dispatch 用于触发 Redux 中的状态更新。 dispatch是派遣的意思
  const dispatch = useDispatch();
  return (
    <div id="wd-counter-redux">
      <h2>Counter Redux</h2>
      <h3>{count}</h3>
      <button
        onClick={() => dispatch(increment())}
        id="wd-counter-redux-increment-click"
        className="btn btn-success"
      >
        {" "}
        Increment{" "}
      </button>
      <button
        onClick={() => dispatch(decrement())}
        id="wd-counter-redux-decrement-click"
        className="btn btn-danger"
      >
        {" "}
        Decrement{" "}
      </button>
      <hr />
    </div>
  );
}
