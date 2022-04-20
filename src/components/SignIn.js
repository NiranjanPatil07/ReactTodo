import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useCookies } from "react-cookie";

function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["Username"]);

  const navigate = useNavigate();

  let login = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:4000/login`, {
        username: userName,
        password: password,
      })
      .then(function (response) {
        if (response.data === true) {
          setCookie("Username", userName, { path: "/" });
          navigate("home");
        } else {
          alert("Invalid Username or Password");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let signUp = () => {
    console.log("SIGNUP");
    navigate("/SignUp");
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card w-50 ">
        <div className="card-body">
          <h2 className="singup text-center">SIGN-IN</h2>
          <form>
            <div className="username">
              <label className="form-label mt-4">USERNAME</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="password">
              <label className="form-label mt-3">PASSWORD</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <button
              className="btn btn-primary mt-3"
              type="submit"
              onClick={login}
            >
              LOGIN
            </button>
            <br />
          </form>
          <p className="signuptxt text-center" onclick="signUp()">
            Not Registered Yet?
            <span>
              <a>SIGN-UP</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
