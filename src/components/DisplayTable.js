import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import Button from "@mui/material/Button";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import "./style.css";
import axios from "axios";
import { useState } from "react";
import _ from "lodash";

//Bit bucket testing
function DisplayData({
  tododata,
  setCount,
  Count,
  setupdate,
  paginatedData,
  setPaginatedData,
}) {
  const pageSize = 5;
  const pageCount = tododata ? Math.ceil(tododata.length / pageSize) : 0;
  const pages = _.range(1, pageCount + 1);

  // console.log(paginatedData);

  // const [paginatedData, setPaginatedData] = useState();
  const [currentPage, setcurrentPage] = useState(1);

  const pagination = (pageNo) => {
    setcurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const newPaginatedData = _(tododata)
      .slice(startIndex)
      .take(pageSize)
      .value();
    setPaginatedData(newPaginatedData);
  };

  let updatedata = (id, name, date) => {
    setupdate({ id, name, date });
  };

  let deletedata = (e) => {
    axios
      .delete(`https://nir1-todoapp-backend.herokuapp.com/deletedata`, {
        data: { idtodolists: e },
      })
      .then((result) => {
        setCount(Count + 1);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <table className="table" id="table">
        <thead>
          <tr className="table-danger">
            <th scope="col">#</th>
            <th scope="col">NAME</th>
            <th scope="col">DATE</th>
            <th scope="col">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((listValue, index) => {
            // debugger;
            return (
              <tr key={index}>
                <td>{listValue.idtodolists}</td>
                <td>{listValue.name}</td>
                <td>{listValue.date.slice(0, 10)}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    id="updatebtn"
                    onClick={() =>
                      updatedata(
                        listValue.idtodolists,
                        listValue.name,
                        listValue.date.slice(0, 10)
                      )
                    }
                  >
                    <EditIcon />
                  </button>{" "}
                  <button
                    className="btn btn-danger btn-sm"
                    id="delbtn"
                    onClick={() => deletedata(listValue.idtodolists)}
                  >
                    <DeleteForeverIcon />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <div className="Pagination d-flex justify-content-center">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setTableData(tableData - 5)}
        >
          <ArrowBackIosNewIcon />
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setTableData(tableData + 5)}
        >
          <NavigateNextIcon />
        </button>
      </div> */}
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {pages.map((page) => (
            <li
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <p className="page-link" onClick={() => pagination(page)}>
                {page}
              </p>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default DisplayData;
