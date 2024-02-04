import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBooks } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [postDetails, setPostDetails] = useState({
    title: "",
    author: "",
    language: "",
    rating: 0,
  });

  const navigate =  useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "rating") {
      setPostDetails((prevDetails) => ({
        ...prevDetails,
        [name]: parseInt(value, 10),
      }));
    } else {
      setPostDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    }
  };
  const languageOptions = [
    "English",
    "Hindi",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Japanese",
    "Chinese",
  ];
  const handleSubmit = async(e) => {
    e.preventDefault();
   await dispatch(addBooks(postDetails, token));
   navigate("/dashboard")
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title:
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            name="title"
            value={postDetails.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Author:
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            name="author"
            value={postDetails.author}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Language:
          </label>
          <select
            name="language"
            onChange={handleInputChange}
            value={postDetails.language}
            className="border p-2 rounded-md w-full"
          >
            {languageOptions.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Rating:
          </label>
          <select
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            name="rating"
            value={postDetails.rating}
            onChange={handleInputChange}
            required
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
