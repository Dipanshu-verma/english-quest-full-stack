import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePostAction, editPostAction, getPost } from "../redux/actions";
import EditModel from "./EditModel";
import Pagination from "./Pagination";
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
const Dashboard = () => {
  const [queryData, setQueryData] = useState({
    sort: "",
    language: "",
    category: "",
    page: 1,
    limit: 5,
  });
  const [editModalVisible, setEditModalVisible] = useState(false);

  const [postDetails, setPostDetails] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(queryData));
  }, [dispatch, queryData]);

  const { userId, books, token, totalPage } = useSelector((state) => state);

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

  const handleEditBook = (book) => {
    setPostDetails(book);
    setEditModalVisible(true);
  };

  const handleDeleteBook = (bookId) => {
    dispatch(deletePostAction(bookId, token));
  };

  const handlePagination = (newPage) => {
    setQueryData({ ...queryData, page: newPage });
  };

  const handleFilterChange = (e) => {
    setQueryData({ ...queryData, [e.target.name]: e.target.value });
  };

  const handlePrevPage = () => {
    if (queryData.page > 1) {
      handlePagination(queryData.page - 1);
    }
  };

  const handleNextPage = () => {
    if (queryData.page < totalPage) {
      handlePagination(queryData.page + 1);
    }
  };

  const handleCloseModal = () => {
    setEditModalVisible(false);
  };

  const handleSaveChanges = () => {
    const { title, author, rating, language } = postDetails;

    dispatch(
      editPostAction(postDetails._id, token, {
        title,
        author,
        rating,
        language,
      })
    );
    setEditModalVisible(false);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Book Dashboard</h1>
      <div className="mb-4 flex space-x-4 pl-10">
        <select
          name="language"
          onChange={handleFilterChange}
          value={queryData.language}
          className="border p-2 rounded-md"
        >
          <option value="">Filter By Language</option>
          {languageOptions.map((language, index) => (
            <option key={index} value={language}>
              {language}
            </option>
          ))}
        </select>

        <select
          name="sort"
          onChange={handleFilterChange}
          value={queryData.sort}
          className="border p-2 rounded-md"
        >
          <option value="">Sort By Date</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <select
          name="category"
          onChange={handleFilterChange}
          value={queryData.category}
          className="border p-2 rounded-md"
        >
          <option value="">Select By Date</option>
          <option value="old">Old One</option>
          <option value="latest">New One</option>
        </select>
      </div>

      {books && books.length > 0 ? (
        <div className="px-10 overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 border-b">Title</th>
                <th className="py-3 px-4 border-b">Author</th>
                <th className="py-3 px-4 border-b">Language</th>
                <th className="py-3 px-4 border-b">Rating</th>
                <th className="py-3 px-4 border-b">Date</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr
                  key={book._id}
                  className="transition duration-300 ease-in-out hover:bg-gray-100"
                >
                  <td className="py-3 px-4 border-b">{book.title}</td>
                  <td className="py-3 px-4 border-b">{book.author}</td>
                  <td className="py-3 px-4 border-b">{book.language}</td>
                  <td className="py-3 px-4 border-b">{book.rating}</td>
                  <td className="py-3 px-4 border-b">
                    {new Date(book.createdAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 border-b space-x-2">
                    {book.userId === userId && (
                      <>
                        <button
                          onClick={() => handleEditBook(book)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteBook(book._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No books available.</p>
      )}

      {/* Edit Modal */}
      {editModalVisible && postDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <EditModel
            postDetails={postDetails}
            handleInputChange={handleInputChange}
            handleSaveChanges={handleSaveChanges}
            handleCloseModal={handleCloseModal}
          />
        </div>
      )}

      <Pagination
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        handlePagination={(page) => handlePagination(page)}
        totalPage={totalPage}
        queryData={queryData}
      />
    </div>
  );
};

export default Dashboard;
