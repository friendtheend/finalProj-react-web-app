import React, { useState } from "react";
export default function ObjectStateVariable() {
  const [person, setPerson] = useState({ name: "Peter", age: 24 });
  return (
    <div>
      <h2>Object State Variables</h2>
      <pre>{JSON.stringify(person, null, 2)}</pre>
      {/* e.target.value：present current input value. */}
      <input
        defaultValue={person.name}
        // ...person can make sure only name's value change, other value of person keep same.
        onChange={(e) => setPerson({ ...person, name: e.target.value })}
      />
      <input
        defaultValue={person.age}
        onChange={(e) =>
          setPerson({ ...person, age: parseInt(e.target.value) })
        }
      />
      <hr />
    </div>
  );
}
