import api from "../controllers/api";
const uploadcertificateinfo = (info) => {
  return new Promise((resolve, rej) => {
    api
      .post("/api/student/certificate/new", info)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        rej(new Error(err));
      });
  });
};

export default uploadcertificateinfo;
