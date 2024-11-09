import { useState, useEffect } from "react";
import axios from "axios"; // Pastikan axios diimpor
import Swal from "sweetalert2";

const useList = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url, {
          headers: {
            "api-key": "RJS1-202409", // apiKey di-hardcode
            "Content-Type": "application/json",
          },
        });
        setData(response.data.data); // Ambil data langsung dari response axios
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  const DeleteData = async (id) => {
    try {
      await axios.delete(`${url}/${id}`, {
        headers: {
          "api-key": "RJS1-202409",
          "Content-Type": "application/json",
        },
      });
      setData((prevData) => prevData.filter((item) => item.id !== id));
      Swal.fire({
        title: "Berhasil",
        text: "Data berhasil dihapus",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      setError(error);
    }
  };

  return { data, loading, error, DeleteData };
};

export default useList;
