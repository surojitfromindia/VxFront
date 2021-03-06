import api from "./api";

const downloadCertificate = (info) => {
  let s1 = `file?roll=${info.student_roll}&number=${info.student_number}`;
  //let s2 = `http://localhost:5000/api/download/certificate?roll=${info.student_roll}&number=${info.student_number}`;
  api
    .get(`/${s1}`, {
      responseType: "blob",
    })
    .then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${info.student_roll + info.student_name + info.student_number}.docx`
      );
      document.body.appendChild(link);
      link.click();
    })
    .catch((err) => {
      alert("entry not found");
    });
};

export default downloadCertificate;
