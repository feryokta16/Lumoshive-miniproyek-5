import React, { useEffect, useContext, useState } from "react";
import "./ListData.css";
import { Link } from "react-router-dom";
import useList from "../Utils/useList";
import { LanguageContext } from "../App";
import Form from "../Modal/Form";

const ListData = () => {
  const { Language } = useContext(LanguageContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const { data, DeleteData } = useList(
    "https://lumoshive-academy-api.vercel.app/students"
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleOpenModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <div>
      <button className="cstm-btn-blue " onClick={() => handleOpenModal(null)}>
        Add Data
      </button>
      <Form
        isOpen={isModalOpen}
        OnClose={handleCloseModal}
        student={selectedStudent}
      />
      <table>
        <thead>
          <tr>
            <td>{Language === "en" ? "Student Id" : "Nomor Induk Siswa"}</td>
            <td>{Language === "en" ? "Name" : "Nama"}</td>
            <td>{Language === "en" ? "Class" : "Kelas"}</td>
            <td>{Language === "en" ? "Actions" : "Tindakan"}</td>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((student) => (
              <tr key={student.id}>
                <td>{student.nim}</td>
                <td>{student.name}</td>
                <td>{student.year}</td>
                <td>
                  <Link to={`/detail/${student.id}`}>
                    <button className="btn-grup-cstm-green">
                      {Language === "en" ? "Detail" : "Selengkapnya"}
                    </button>
                  </Link>
                  <button
                    className="cstm-btn-yellow mx-2"
                    onClick={() => handleOpenModal(student)}
                  >
                    {Language === "en" ? "Edit" : "Edit"}
                  </button>
                  <button
                    className="btn-grup-cstm-red"
                    onClick={() => DeleteData(student.id)}
                  >
                    {Language === "en" ? "Delete" : "Hapus"}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListData;
