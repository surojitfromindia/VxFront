import axios from "axios";

let s1 = "https://vxback.herokuapp.com";
let s2 = "http://localhost:5000";
export default axios.create({
  baseURL: s1,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});
