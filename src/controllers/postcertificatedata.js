import axios from "axios";
const uploadcertificateinfo = (info) => {
  return new Promise((resolve, rej) => {
    axios({
      url: "http://localhost:5000/api/student/certificate/new",
      method: "POST",
      data: info,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        rej(new Error(err));
      });
  });
};

export default uploadcertificateinfo;
