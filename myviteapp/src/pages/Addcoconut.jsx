import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Layoutt from '../components/Layoutt';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Addcoconut = () => {
  const [coconut, setcoconut] = useState({
    CName: "",
    CPrice: "",
    CNote: "",
    CStatus: ""
  });

  const [image, setimage] = useState(null);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcoconut({
      ...coconut,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setimage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("CName", coconut.CName);
    formdata.append("CPrice", coconut.CPrice);
    formdata.append("CNote", coconut.CNote);
    formdata.append("CStatus", coconut.CStatus);
    formdata.append("image", image);

    try {
      await axios.post("http://localhost:5001/api/coconut/addcoconut", formdata, {
        withCredentials: true
      });

      setResult({ message: "Coconut added successfully!", success: true });

      setTimeout(() => {
        setResult(null);
        navigate('/getcoconut');
      }, 3000);

      setcoconut({
        CName: "",
        CPrice: "",
        CNote: "",
        CStatus: ""
      });
      setimage(null);
    } catch (e) {
      setResult({ message: "Please sign in.", success: false });
      setTimeout(() => {
        setResult(null);
        navigate('/login');
      }, 3000);
    }
  };

  return (
    <div className="bg-white h-screen overflow-y-auto">
      <Layoutt>
        <Layout>
          <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md p-6 space-y-6 bg-white shadow-md rounded-lg">
              <h2 className="text-center text-2xl font-bold">Add coconut & other</h2>

              {result && (
                <div className={`p-1 rounded-md flex items-center gap-2 
                  ${result.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {result.success ? (
                    <FaCheckCircle className="text-green-500 text-xl" />
                  ) : (
                    <FaTimesCircle className="text-red-500 text-xl" />
                  )}
                  <span>{result.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name:</label>
                  <input
                    type="text"
                    name="CName"
                    value={coconut.CName}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-md bg-green-50"
                    placeholder="product"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price:</label>
                  <input
                    type="number"
                    name="CPrice"
                    value={coconut.CPrice}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-md bg-green-50"
                    placeholder="price"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description:</label>
                  <input
                    type="text"
                    name="CNote"
                    value={coconut.CNote}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-md bg-green-50"
                    placeholder="description"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status:</label>
                  <input
                    type="text"
                    name="CStatus"
                    value={coconut.CStatus}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-md bg-green-50"
                    placeholder="status"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full mt-1 p-2 border rounded-md bg-green-50"
                    placeholder="image"
                    required
                  />
                </div>
                <button type="submit"
                  className="w-full bg-green-700 hover:bg-green-800 text-white p-2 rounded-md">Submit</button>
              </form>
            </div>
          </div>
        </Layout>
      </Layoutt>
    </div>
  );
};

export default Addcoconut;
