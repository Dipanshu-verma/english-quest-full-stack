import React from "react";
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
const EditModel = ({
  postDetails,
  handleInputChange,
  handleSaveChanges,
  handleCloseModal,
}) => {
  return (
    <div className="bg-white p-6 w-[40%] rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Edit Book</h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Title:
        </label>
        <input
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-gray-800"
          type="text"
          name="title"
          value={postDetails?.title}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Author:
        </label>
        <input
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-gray-800"
          type="text"
          name="author"
          value={postDetails?.author}
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
          value={postDetails?.language}
          className="border p-2 rounded-md w-full text-gray-800"
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
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-gray-800"
          name="rating"
          value={postDetails?.rating}
          onChange={handleInputChange}
          required
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleSaveChanges}
          className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 focus:outline-none mr-2"
        >
          Save Changes
        </button>
        <button
          onClick={handleCloseModal}
          className="bg-gray-300 text-black px-3 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EditModel;
