import liststyle from "../css/StudentList.module.css";
import api from "../controllers/api";
import React, { Suspense } from "react";
import { useState, useEffect } from "react";
import deleteCertificateRecord from "../controllers/deleteCertificate";
//import ListItem from "./ListItem";
const ListItem = React.lazy(() => import("./ListItem"));
var ls;

let s1 = "https://vxback.herokuapp.com";
let s2 = "http://localhost:5000";
export default function StudentList() {
  const [loadingText, setLoadingText] = useState("Loading ... ");
  const [studentInfo, setStudentInfo] = useState([]);
  const [isNewMessageHidden, setIsNewMessageHidden] = useState(true);
  const [newRecordCount, setNewRecordCount] = useState({ m: "", mid: 0 });

  useEffect(
    function () {
      let i = setTimeout(() => {
        setIsNewMessageHidden(!isNewMessageHidden);
      }, 5000);
      return () => clearTimeout(i);
    },
    [newRecordCount]
  );
  useEffect(() => {
    getData();
  }, []);

  //this has bugs
  useEffect(
    function () {
      if (studentInfo.length !== 0) {
        let newRecordev = new EventSource(
          `${s1}/api/student/certificate/${ls.length}`
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
              <Suspense
                key={`${student._id}`}
                fallback={<div>item loading</div>}
              >
                <ListItem
                  ondeleteaction={ondeleteaction}
                  info={student}
                  key={`${student._id}`}
                />
              </Suspense>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
