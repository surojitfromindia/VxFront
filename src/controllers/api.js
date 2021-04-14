import axios from "axios";

export default axios.create({
  baseURL: "https://vxback.herokuapp.com",
  timeout: 3000,
});
