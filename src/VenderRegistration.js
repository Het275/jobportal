import React from "react";
import axios from "axios";
import { useState, useSelector } from "react";

const UPLOAD_ENDPOINT = "https://blobstation.free.beeceptor.com";

function VendorRegistration() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (event) => {
    setStatus(""); // Reset status
    event.preventDefault();
    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("name", name);
    const resp = await axios.post(UPLOAD_ENDPOINT, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    setStatus(resp.status === 200 ? "Thank you!" : "Error.");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>React File Upload</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
      <button type="submit" disabled={!(file && name)}>
        Upload File
      </button>
      {status ? <h1>{status}</h1> : null}
    </form>
  );
}

export default VendorRegistration;