import { useSelector, useDispatch } from "react-redux";
export default function HelloRedux() {
  // Select the message from that reducer that we put in there that data structure.
  const { message } = useSelector((state: any) => state.helloReducer);
  return (
    <div id="wd-hello-redux">
      <h3>Hello Redux</h3>
      {/* return The initMessage */}
      {/* 
      const initialState = {
             message: "Hello",
      };
      */}
      <h4>{message}</h4> <hr />
    </div>
  );
}
