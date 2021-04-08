import React, { useState, useEffect } from "react";
import AppStyle from "./css/App.module.css";
import StudentList from "./components/StudentList";
import StudentEntry from "./components/StudentEntry";
import api from "./controllers/api";

function App() {
  const [isServerOn, setServerOn] = useState(false);
  const [home, setHome] = useState(<StudentEntry />);
  const homechange = (ev) => {
    let value = ev.target.value;
    switch (value) {
      case "entry":
        setHome(<StudentEntry />);
        break;
      case "view":
        setHome(<StudentList />);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    api
      .get("/")
      .then((res) => {
        setServerOn(true);
      })
      .catch((err) => setServerOn(false));
  }, []);

  return !isServerOn ? (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#ef4535",
        justifyContent: "center",
        alignItems: "center",
        fontSize: " 2rem",
        color: "white",
      }}
    >
      Can't connect to Server
    </div>
  ) : (
    <div className={AppStyle.App}>
      <div onChange={homechange} className={AppStyle.hea}>
        <input
          defaultChecked
          id="ent"
          hidden
          type="radio"
          name="homview"
          value="entry"
        />
        <label htmlFor="ent" className={AppStyle.labelC}>
          {" "}
          Enlist
        </label>

        <input id="view" hidden type="radio" name="homview" value="view" />
        <label htmlFor="view" className={AppStyle.labelC}>
          {" "}
          View
        </label>
      </div>
      <div className={AppStyle.bod}>{home}</div>
    </div>
  );
}

export default App;
