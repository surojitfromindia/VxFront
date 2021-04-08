import React from "react";
import { useState, useEffect } from "react";

import estyle from "../css/StudentEntry.module.css";
import postce from "../controllers/postcertificatedata";
import download from "../controllers/download";
import api from "../controllers/api";
let type = "";

export default function StudentEntry({ predata }) {
  const [isServerOn, setServerOn] = useState(true);

  useEffect(() => {
    api
      .get("")
      .then((res) => {
        setServerOn(true);
      })
      .catch((err) => setServerOn(false));
  }, []);

  const ontypechange = (ev) => {
    type = ev.target.value;
  };

  const ongradechange = (ev) => {
    ev.target.value = ev.target.value.toUpperCase();
  };
  const ondownloadclick = () => {
    let info = {
      student_roll: document.getElementById("roll").value.trim(),
      student_number: document.getElementById("number").value.trim(),
    };
    if (info?.student_number) download(info);
  };

  const onsavbtnclick = async () => {
    let collecteddata = {
      student_name: document.getElementById("sname").value.trim(),
      father_name: document.getElementById("fname").value.trim(),
      student_type: type,
      passing_year: Number(document.getElementById("year").value.trim()),
      student_roll: document.getElementById("roll").value.trim(),
      student_number: document.getElementById("number").value.trim(),
      student_grade: document.getElementById("grade").value.trim(),
      iss_date: document.getElementById("isdate").value.trim(),
      serial_no: document.getElementById("snum").value.trim(),
    };
    postce(collecteddata)
      .then((d) => {
        alert("Student Entry Successfull");
      })
      .catch((err) => alert("Error! check entries again"));
  };
  return (
    <main className={estyle.container}>
      {!isServerOn ? (
        <div>Oops! Sever Error</div>
      ) : (
        <div>
          <h2>Enlist student</h2>
          <div className={estyle.warningbox}></div>
          <div className={estyle.form}>
            <div className={estyle.iwra}>
              <label htmlFor="snum">Serial number (00N)</label>
              <input
                placeholder={"Serial Number On Certificate Top (00N)"}
                id="snum"
                className={estyle.enbox}
                type="text"
              />
            </div>
            <div className={estyle.iwra}>
              <label htmlFor="sname">Student name</label>
              <input
                placeholder={"Student Name"}
                id="sname"
                className={estyle.enbox}
                type="text"
              />
            </div>
            <div className={estyle.iwra}>
              <label htmlFor="fname">Father name</label>
              <input
                placeholder={"Student Parent Name"}
                id="fname"
                className={estyle.enbox}
                type="text"
              />
            </div>
            <div className={estyle.radio}>
              Select Student Type
              <div className={estyle.rgrp}>
                <label>
                  <input
                    onChange={ontypechange}
                    type="radio"
                    id="treg"
                    value="Regular"
                    name="stype"
                  />
                  Regular
                </label>
                <label>
                  <input
                    onChange={ontypechange}
                    type="radio"
                    value="Compart"
                    name="stype"
                  />
                  Compart
                </label>
                <label>
                  <input
                    onChange={ontypechange}
                    type="radio"
                    value="C.C"
                    name="stype"
                  />
                  C.C
                </label>
              </div>
            </div>
            <div className={estyle.iwra}>
              <label htmlFor="year">Passing year</label>
              <input
                placeholder={"Passing Year greater than 2000"}
                id="year"
                className={estyle.enbox}
                type="number"
              />
            </div>
            <div className={estyle.iwra}>
              <label htmlFor="roll">Roll</label>
              <input
                placeholder={"Student Roll"}
                onChange={ongradechange}
                id="roll"
                className={estyle.enbox}
                type="text"
              />
            </div>
            <div className={estyle.iwra}>
              <label htmlFor="number">Number</label>
              <input
                placeholder={"Student Roll"}
                id="number"
                className={estyle.enbox}
                type="text"
              />
            </div>
            <div className={estyle.iwra}>
              <label htmlFor="grade">Grade</label>
              <input
                placeholder={"Student Grade"}
                type="text"
                autoCapitalize={"words"}
                id="grade"
                className={estyle.enbox}
                onChange={ongradechange}
              />
            </div>
            <div className={estyle.iwra}>
              <label htmlFor="isdate">Issue Date (dd-mm-yyyy)</label>
              <input id="isdate" className={estyle.enbox} type="Date" />
            </div>
            <div className={estyle.buttongroup}>
              <button onClick={ondownloadclick} className={estyle.btnDownload}>
                Download
              </button>
              <button onClick={onsavbtnclick} className={estyle.btnsave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
