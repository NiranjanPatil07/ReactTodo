import "./App.css";
import Home from "./components/home";
// import SignIn from "./components/SignIn";
import SignIn from "./components/Login";
import SignUp from "./components/Signup";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />}></Route>;
      <Route path="/home" element={<Home />}></Route>;
      <Route path="/SignUp" element={<SignUp />}></Route>;
    </Routes>
  );
}

export default App;
