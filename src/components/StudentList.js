import liststyle from "../css/StudentList.module.css";
import api from "../controllers/api";
import React from "react";
import { useState, useEffect } from "react";
import deleteCertificateRecord from "../controllers/deleteCertificate";
import ListItem from "./ListItem";
var ls = [];
export default function StudentList() {
  const [loadingText, setLoadingText] = useState("Loading ... ");
  const [studentInfo, setStudentInfo] = useState([]);
  const [isNewMessageHidden, setIsNewMessageHidden] = useState(true);
  const [newRecordCount, setNewRecordCount] = useState({ m: "", mid: 0 });

  useEffect(
    function () {
      let i = setTimeout(() => {
        setIsNewMessageHidden(!isNewMessageHidden);
      }, 2000);
      return () => clearTimeout(i);
    },
    [newRecordCount]
  );
  useEffect(() => {
    getData();
  }, []);

  useEffect(
    function () {
      if (studentInfo.length !== 0) {
        let newRecordev = new EventSource(
          `http://192.168.0.5:5000/api/student/certificate/${studentInfo.length}`
        );
        newRecordev.onmessage = (ev) => {
          let j = JSON.parse(ev.data);
          setNewRecordCount({ m: j.message, mid: ev.lastEventId });
        };
        return () => newRecordev.close();
      }
    },
    [studentInfo]
  );

  const getData = () => {
    api
      .get("/api/student/certificates/")
      .then((res) => {
        setStudentInfo(res.data.reverse());
        ls = res.data;
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
            {isNewMessageHidden ? "" : <div>{newRecordCount.m}</div>}
            {studentInfo.map((student) => (
              <ListItem
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
