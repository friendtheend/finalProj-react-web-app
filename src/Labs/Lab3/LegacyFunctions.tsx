function add(a: number, b: number) {
    return a + b;
  }
  export default function LegacyFunctions() {
    const twoPlusFour = add(2, 4);
    console.log(twoPlusFour);
    return (
      <div id="wd-legacy-functions">
        <h4>Functions</h4>
        <h5>Legacy ES5 functions</h5>
        twoPlusFour = {twoPlusFour}
        <br />
        {/* { } 这个符号里面不一定要是一个变量，也可以是一个function call */}
        add(2, 4) = {add(2, 4)}
        <hr />
      </div>
  );}
  