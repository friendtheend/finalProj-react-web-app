// this function is called the arrow function syntax
// from ES6 
// 括号里面的是arguments 参数
const ConditionalOutputIfElse = () => {
    const loggedIn = true;
    if(loggedIn) {
      return (<h2 id="wd-conditional-output-if-else-welcome">Welcome If Else</h2>);
    } else {
      return (<h2 id="wd-conditional-output-if-else-login">Please login If Else</h2>);
    }
   };
   export default ConditionalOutputIfElse;