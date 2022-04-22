import AddTodo from "./AddTodo";
import DisplayData from "./DisplayTable";
import Welcome from "./Welcome";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import ButtonAppBar from "./Navbar";

import _ from "lodash";
const pageSize = 5;

function Home() {
  const [data, setData] = useState([]);

  const [Count, setCount] = useState(0);

  const [update, setupdate] = useState({});

  const [paginatedData, setPaginatedData] = useState([]);

  const cookies = new Cookies();
  const usernameCookie = cookies.get("Username");

  const navigate = useNavigate();

  useEffect(() => {
    // check Cookie;

    if (usernameCookie === undefined) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    // debugger;
    getData();
  }, [Count]);

  let getData = () => {
    console.log("Reload");
    const URL = `https://nir1-todoapp-backend.herokuapp.com/getdata`;
    Axios.get(URL, { params: { usernameCookie } })
      .then((response) => {
        // debugger;
        let tododata = response.data;
        setData(tododata);
        // console.log(data);
        setPaginatedData(_(response.data).slice(0).take(pageSize).value());
        // debugger;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <ButtonAppBar />
      <div className="mt-5 container">
        <Welcome />
        <div className="row">
          <div className="col d-flex justify-content-center mb-5">
            <AddTodo setCount={setCount} Count={Count} update={update} />
          </div>
          <div className="col m-2">
            <DisplayData
              tododata={data}
              setCount={setCount}
              Count={Count}
              setupdate={setupdate}
              setPaginatedData={setPaginatedData}
              paginatedData={paginatedData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
