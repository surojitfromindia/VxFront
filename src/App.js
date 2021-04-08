import React, { useState, useEffect } from "react";
import AppStyle from "./css/App.module.css";
import StudentList from "./components/StudentList";
import StudentEntry from "./components/StudentEntry";
import axios from "axios";

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
    axios
      .get("http://localhost:5000/")
      .then((res) => {
        setServerOn(true);
      })
      .catch((err) => setServerOn(false));
  }, []);

  return !isServerOn ? (
    <div className={AppStyle.App}>Can't connect to Server</div>
  ) : (
    <div className={AppStyle.App}>
      <div onChange={homechange} className={AppStyle.hea}>
        <label className={AppStyle.labelC}>
          <input hidden type="radio" name="homview" value="entry" />
          Entry
        </label>

        <label className={AppStyle.labelC}>
          <input hidden type="radio" name="homview" value="view" />
          view
        </label>
      </div>
      <div className={AppStyle.bod}>{home}</div>
    </div>
  );
}

export default App;
