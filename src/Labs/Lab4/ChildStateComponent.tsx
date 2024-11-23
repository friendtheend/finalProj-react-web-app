// The ChildStateComponent can use references to counter and setCounter to render the state variable 
// and manipulate it through the mutator function. 

export default function ChildStateComponent({
  counter,
  setCounter,
}: {
  counter: number;
  setCounter: (counter: number) => void;
}) {
  return (
    <div id="wd-child-state">
      <h3>Counter {counter}</h3>
      <button
        onClick={() => setCounter(counter + 1)}
        id="wd-increment-child-state-click"
      >
        Increment
      </button>
      <button
        onClick={() => setCounter(counter - 1)}
        id="wd-decrement-child-state-click"
      >
        Decrement
      </button>
      <hr />
    </div>
  );
}
