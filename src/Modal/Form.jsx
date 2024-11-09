import React, { useState, useEffect } from "react";
import "./Form.css";
import PropTypes from "prop-types";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Form = ({ isOpen, OnClose, student }) => {
  const navigate = useNavigate();
  const classOptions = ["pilih kelas", "A", "B", "C", "D", "E"];
  const genderOptions = ["masukan gender", "male", "female"];
  const years = [
    "masukan Tahun",
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
    2021,
    2022,
    2023,
    2024,
    2025,
  ];
  const [nim, setNim] = useState("");
  const [name, setName] = useState("");
  const [className, setClassValue] = useState("");
  const [year, setYear] = useState("");
  const [guardian_name, setGuardianName] = useState("");
  const [birthDate, setBirhtDate] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (student) {
      setNim(student.nim);
      setName(student.name);
      setClassValue(student.class);
      setYear(student.year);
      setGuardianName(student.guardian_name);
      setBirhtDate(student.birthDate);
      setAddress(student.address);
      setGender(student.gender);
    } else {
      setNim("");
      setName("");
      setClassValue("");
      setYear("");
      setGuardianName("");
      setBirhtDate("");
      setAddress("");
      setGender("");
    }
  }, [student]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      nim,
      name,
      class: className,
      year,
      guardian_name,
      birthDate,
      address,
      gender,
    };

    try {
      if (student) {
        await axios.put(
          `https://lumoshive-academy-api.vercel.app/students/${student.id}`,
          newData,
          {
            headers: {
              "Content-Type": "application/json",
              "api-key": "RJS1-202409",
            },
          }
        );
      } else {
        await axios.post(
          "https://lumoshive-academy-api.vercel.app/students",
          newData,
          {
            headers: {
              "Content-Type": "application/json",
              "api-key": "RJS1-202409",
            },
          }
        );
      }

      Swal.fire({
        icon: "success",
        title: student
          ? "Berhasil memperbarui data"
          : "Berhasil menambahkan data",
        confirmButtonText: "OK",
        timer: 1500,
      }).then(() => {
        OnClose();
        navigate("/");
      });

      setNim("");
      setName("");
      setClassValue("");
      setYear("");
      setGuardianName("");
      setBirhtDate("");
      setAddress("");
      setGender("");
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="modal-overlay container">
      <div className="modal-content">
        <h3>{student ? "Edit Student" : "Add Student"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nim">Nim</label>
            <input
              type="number"
              id="nim"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="class">Class</label>
            <select
              name="class"
              id="class"
              value={className}
              onChange={(e) => setClassValue(e.target.value)}
            >
              {classOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="year">Tahun</label>
            <select
              name="year"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="guardian_name">Guardian Name</label>
            <input
              type="text"
              id="guardian_name"
              value={guardian_name}
              onChange={(e) => setGuardianName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="birthDate">Birth Date</label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirhtDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              minLength="20"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              {genderOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="btn-grup-cstm">
            <button className="btn-grup-cstm-green" type="submit">
              {student ? "Update" : "Submit"}
            </button>
            <button
              className="btn-grup-cstm-red"
              type="button"
              onClick={OnClose}
            >
              Close Modal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Form.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  OnClose: PropTypes.func.isRequired,
  student: PropTypes.shape({
    id: PropTypes.string,
    nim: PropTypes.string,
    name: PropTypes.string,
    class: PropTypes.string,
    year: PropTypes.number,
    guardian_name: PropTypes.string,
    birthDate: PropTypes.string,
    address: PropTypes.string,
    gender: PropTypes.string,
  }),
};

export default Form;
