import React, { useState } from "react";
import axios from "axios";

const AddBookForm = () => {
  const [formData, setFormData] = useState({
    Address: "",
    Shelf: "",
    Class: "",
    Keyword: "",
    secretKey: "", 
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.Address ||
      !formData.Shelf ||
      !formData.Class ||
      !formData.Keyword ||
      !formData.secretKey
    ) {
      setError("Please fill out all fields and provide secret key");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/addbooklibrary",
        formData
      );
      setMessage(response.data.message);
      setFormData({
        Address: "",
        Shelf: "",
        Class: "",
        Keyword: "",
        secretKey: "",
      });
    } catch (error) {
      setMessage("Failed to add book");
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Add Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-gray-700 border-b">Address:</label>
            <input
              type="text"
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-700 border-2 p-2 border-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700">Shelf:</label>
            <input
              type="text"
              name="Shelf"
              value={formData.Shelf}
              onChange={handleChange}
              className="w-full rounded-md border-gray-700 border-2 p-2 border-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 border-b">Class:</label>
            <input
              type="text"
              name="Class"
              value={formData.Class}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-700 border-2 p-2 border-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 border-b">Keyword:</label>
            <input
              type="text"
              name="Keyword"
              value={formData.Keyword}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-700 border-2 p-2 border-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 border-b">Secret Key:</label>
            <input
              type="password"
              name="secretKey"
              value={formData.secretKey}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-700 border-2 p-2 border-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mx-auto"
          >
            Add Book
          </button>
        </form>
        {error && <p className="mt-2 text-red-500">{error}</p>}
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default AddBookForm;
