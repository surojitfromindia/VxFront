import React, { useState, useEffect } from "react";
import AppStyle from "./css/App.module.css";
import { Suspense } from "react";
import api from "./controllers/api";
const StudentEntryComponent = React.lazy(() =>
  import("./components/StudentEntry")
);
const StudentListComponent = React.lazy(() =>
  import("./components/StudentList")
);

function App() {
  const [isServerOn, setServerOn] = useState(false);
  const [home, setHome] = useState(
    <Suspense fallback={<div>Loading...</div>}>
      <StudentEntryComponent />
    </Suspense>
  );
  const homechange = (ev) => {
    let value = ev.target.value;
    switch (value) {
      case "entry":
        setHome(
          <Suspense fallback={<div>Loading Component...</div>}>
            <StudentEntryComponent />
          </Suspense>
        );
        break;
      case "view":
        setHome(
          <Suspense fallback={<div>Loading Component...</div>}>
            <StudentListComponent />
          </Suspense>
        );
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
      Connecting to Server...Wait
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
