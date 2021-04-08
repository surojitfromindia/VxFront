import React from "react";
import { useState } from "react";
import itemstyle from "../css/Item.module.css";
import downloadpdf from "../controllers/downloadCertificate";
export default function ListItem({ info, ondeleteaction }) {
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
}
