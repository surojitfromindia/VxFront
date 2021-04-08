import itemstyle from "../css/Item.module.css";
import liststyle from "../css/StudentList.module.css";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import downloadpdf from "../controllers/download";

var ls;
export default function StudentList() {
  const [loadingText, setLoadingText] = useState("Loading ... ");
  const [studentInfo, setStudentInfo] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("http://localhost:5000/api/student/certificates/")
      .then((res) => {
        setStudentInfo(res.data);
        ls = res.data;
      })
      .catch((err) => {
        setLoadingText("Oops! Server Error!");
      });
  };

  const handleSearch = (ev) => {
    if (ev.target.value) {
      let fillterdname = ls.filter((sinf) => {
        let p = sinf.student_name.toLowerCase().startsWith(ev.target.value);
        return p;
      });
      setStudentInfo(fillterdname);
    } else getData();
  };

  return (
    <div className={liststyle.container}>
      {!studentInfo ? (
        loadingText
      ) : (
        <div>
          <div className={liststyle.searchboxCon}>
            <input
              autoFocus={"true"}
              className={liststyle.searchbox}
              onChange={handleSearch}
              type="text"
              placeholder="Search"
            />
          </div>
          <div>
            {studentInfo.map((student) => (
              <Item info={student} key={`${student.student_number}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const Item = ({ info }) => {
  const handledownload = async () => {
    downloadpdf(info);
  };
  return (
    <div className={itemstyle.container}>
      <div className={itemstyle.studenInfo}>
        <p>
          <strong>{info.student_name}</strong>
        </p>
        <p>
          <strong> {info.student_roll} </strong>
          {"  "}
          <strong>{info.student_number}</strong>
          <br />
          Is a {info.student_type} student.
          <br /> certificate issued on {info.iss_date}
        </p>
      </div>
      <div className={itemstyle.actionbuttoncontainer}>
        <button className={itemstyle.btnEdit}>Edit</button>
        <button onClick={handledownload} className={itemstyle.btnDownload}>
          Download
        </button>
      </div>
    </div>
  );
};
