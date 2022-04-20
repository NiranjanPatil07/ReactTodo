import AddIcon from "@mui/icons-material/Add";

import { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { Cookies } from "react-cookie";

function AddTodo({ setCount, Count, update }) {
  const [todoid, settodoid] = useState("");
  const [todoname, settodoname] = useState("");
  const [tododate, settododate] = useState("");

  const cookies = new Cookies();
  const usernameCookie = cookies.get("Username");

  useEffect(() => {
    // debugger;
    if (update.id === undefined) {
      return;
    } else {
      updatedata(update);
    }
  }, [update]);

  let updatedata = (update) => {
    settodoid(update.id);
    settodoname(update.name);
    settododate(update.date);
  };

  let updateintotable = (e) => {
    e.preventDefault();

    var payload = {
      todoid,
      todoname,
      tododate,
    };

    fetch("https://nir1-todoapp-backend.herokuapp.com/UpdateData", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(function (response) {
        setCount(Count + 1);
      })
      .catch(function (error) {
        console.log(error);
      });
    settodoid("");
    settodoname("");
    settododate("");
  };

  let AddData = (e) => {
    e.preventDefault();

    axios
      .post(`https://nir1-todoapp-backend.herokuapp.com/postdata`, {
        name: todoname,
        date: tododate,
        username: usernameCookie,
      })
      .then(function (response) {
        setCount(Count + 1);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="card">
      <div className="card-header">ADD ITEM</div>
      <div className="card-body">
        <form>
          <label className="form-label">NAME</label>
          <input
            type="text"
            className="form-control"
            id="todoname"
            placeholder="Todo item"
            value={todoname}
            onChange={(event) => settodoname(event.target.value)}
            required
          />
          <label className="mt-2 form-label">DATE</label>
          <input
            type="date"
            className="form-control"
            id="tododate"
            value={tododate}
            onChange={(event) => settododate(event.target.value)}
            required
          />

          <button className=" mt-3s btn btn-outline-success" onClick={AddData}>
            <AddIcon />
          </button>
          <button
            className=" m-4 btn btn-outline-primary"
            onClick={updateintotable}
          >
            UPDATE
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTodo;
