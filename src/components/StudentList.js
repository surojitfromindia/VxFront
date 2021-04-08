import itemstyle from "../css/Item.module.css";
import liststyle from "../css/StudentList.module.css";
import api from "../controllers/api";
import React from "react";
import { useState, useEffect } from "react";
import downloadpdf from "../controllers/download";
import deleteCertificateRecord from "../controllers/deleteCertificate";

var ls;
export default function StudentList() {
  const [loadingText, setLoadingText] = useState("Loading ... ");
  const [studentInfo, setStudentInfo] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    api
      .get("/api/student/certificates/")
      .then((res) => {
        setStudentInfo(res.data.reverse());
        ls = res.data.reverse();
      })
      .catch((err) => {
        setLoadingText("Oops! Server Error!");
      });
  };

  const handleSearch = (ev) => {
    if (ev.target.value) {
      let fillterdname = ls.filter((sinf) => {
        let v = ev.target.value.toLowerCase();
        let p =
          sinf.student_name.toLowerCase().startsWith(v) ||
          sinf.student_roll.toLowerCase().startsWith(v) ||
          sinf.student_number.toLowerCase().startsWith(v) ||
          sinf.student_type.toLowerCase().startsWith(v) ||
          sinf.student_grade.toLowerCase().startsWith(v);
        return p;
      });
      setStudentInfo(fillterdname);
    } else getData();
  };

  const ondeleteaction = (id, sname) => {
    deleteCertificateRecord(id, sname);
    let newList = studentInfo.filter((sinfo) => {
      return sinfo._id !== id;
    });
    setStudentInfo([...newList]);
  };
  return (
    <div className={liststyle.container}>
      {!studentInfo ? (
        loadingText
      ) : (
        <div>
          <div className={liststyle.searchboxCon}>
            <input
              autoFocus={true}
              className={liststyle.searchbox}
              onChange={handleSearch}
              type="text"
              placeholder="Search (Roll, Number, Name, Group, Grade )"
            />
          </div>
          <div className={liststyle.list}>
            {studentInfo.map((student) => (
              <Item
                ondeleteaction={ondeleteaction}
                info={student}
                key={`${student.student_number}${student.student_roll}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const Item = ({ info, ondeleteaction }) => {
  const [count, setCount] = useState(0);
  const handledownload = async () => {
    downloadpdf(info);
  };
  var t;
  const handleDelete = () => {
    setCount(count + 1);
    console.log(count);
    t = setTimeout(() => {
      setCount(0);
    }, 2000);
    if (count === 1) {
      clearTimeout(t);
      ondeleteaction(info._id, info.student_name);
    }
  };
  return (
    <div className={itemstyle.container}>
      <div className={itemstyle.studenInfo}>
        <strong>{info.student_name}</strong>
        <div>
          <strong> {info.student_roll} </strong>
          {"  "}
          <strong>{info.student_number}</strong>
          {"  "}
          <strong>{info.student_type}</strong>
        </div>
        <strong> {info.student_grade} </strong>
        <span>
          certificate issued on <br /> {info.iss_date}
        </span>
      </div>
      <div className={itemstyle.actionbuttoncontainer}>
        <button onClick={handleDelete} className={itemstyle.btnDelete}>
          {count === 1 ? "Again" : "Delete"}
        </button>
        <button onClick={handledownload} className={itemstyle.btnDownload}>
          Download
        </button>
      </div>
    </div>
  );
};
