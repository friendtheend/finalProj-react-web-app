export default function TernaryOperator() {
  let loggedIn = true;

  return (
    <div id="wd-ternary-operator">
      <h4>Logged In</h4>
      {/* if loggedIn=True, display Welcome, otherwise display Please Login */}
      {loggedIn ? <p>Welcome</p> : <p>Please login</p>} <hr />
    </div>
  );
}
