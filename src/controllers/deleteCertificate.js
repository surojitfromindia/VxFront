import api from "./api";

export default function deleteCertificate(id, recordname) {
  api
    .delete(`/api/student/certificate/${id}`)
    .then((deleres) => {
      if (deleres.data === true) alert(`Record ${recordname} is deleted `);
      else alert("Can't find record");
    })
    .catch((err) => {
      alert("some error occured");
    });
}
