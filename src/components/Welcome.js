import React from "react";
import { Cookies } from "react-cookie";

function Welcome() {
  const cookies = new Cookies();
  const usernameCookie = cookies.get("Username");

  //   let Date = () => {
  var today = new Date();
  var date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  return (
    <div className="ms-4 mb-3">
      <h5>Welcome: {usernameCookie}</h5>
      {/* <h5>Today's Date: {date}</h5> */}
    </div>
  );
}

export default Welcome;
