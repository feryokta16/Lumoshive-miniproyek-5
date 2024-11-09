import React, { useState, useEffect, useContext } from "react";
import useList from "../Utils/useList";
import { useParams, useNavigate } from "react-router-dom";
import { LanguageContext } from "../App";

const DetailData = () => {
  const { Language } = useContext(LanguageContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({});
  const { data } = useList(
    `https://lumoshive-academy-api.vercel.app/students/${id}`
  );
  useEffect(() => {
    if (data) {
      setPost(data);
    }
  }, [data]);

  if (!post) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <button className="btn-grup-cstm-green" onClick={() => navigate(-1)}>
        {Language === "en" ? "Back" : "kembali"}
      </button>
      <form>
        <div>
          <label htmlFor="">Nim</label>
          <input type="text" value={post.nim} id="nim" disabled />
        </div>
        <div>
          <label htmlFor="">Nama</label>
          <input type="text" value={post.name} id="name" disabled />
        </div>
        <div>
          <label htmlFor="">Kelas</label>
          <input type="text" value={post.class} id="class" disabled />
        </div>
        <div>
          <label htmlFor="">Year</label>
          <input type="text" value={post.year} id="year" disabled />
        </div>
        <div>
          <label htmlFor="">Guardian name</label>
          <input
            type="text"
            value={post.guardian_name}
            id="guardian_name"
            disabled
          />
        </div>
        <div>
          <label htmlFor="">BirtDate</label>
          <input type="text" value={post.birthDate} id="birthDate" disabled />
        </div>
        <div>
          <label htmlFor="">Alamat</label>
          <input type="text" value={post.address} id="address" disabled />
        </div>
        <div>
          <label htmlFor="">Gender</label>
          <input type="text" value={post.gender} id="gender" disabled />
        </div>
      </form>
    </div>
  );
};

export default DetailData;
