import { useState } from "react";
import * as client from "./client";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as db from "../Database";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const signin = () => {
  //   const user = db.users.find(
  //     (u: any) =>
  //       u.username === credentials.username &&
  //       u.password === credentials.password
  //   );
  //   if (!user) return;
  //   dispatch(setCurrentUser(user));
  //   navigate("/Kanbas/Dashboard");
  // };

  const signin = async () => {
    const user =  await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    navigate("/Kanbas/Dashboard");
  };


  return (
    <div className="row">
      <div
        id="wd-signin-screen"
        className="col-lg-6 col-md-5 col-sm-10"
        style={{ width: "330px" }}
      >
        <h3>Sign in</h3>
        <input
          defaultValue={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          className="form-control mb-2"
          placeholder="username"
          id="wd-username"
        />
        <input
         defaultValue={credentials.password}
         onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}

          id="wd-password"
          placeholder="password"
          type="password"
          className="form-control mb-2"
        />{" "}
        {/* <Link  id="wd-signin-btn"
             to="/Kanbas/Dashboard"> Sign in </Link>  */}
        <button
        onClick={signin}
          id="wd-signin-btn"
          className="btn btn-md btn-primary me-1 form-control mb-2"
        >
          Signin
        </button>
        <Link id="wd-signup-link" to="/Kanbas/Account/Signup">
          Sign up
        </Link>
      </div>
    </div>
  );
}
