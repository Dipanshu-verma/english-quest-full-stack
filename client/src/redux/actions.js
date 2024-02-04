import axios from "axios";

const registerAction = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://node-compy.onrender.com/signup",
      userData
    );
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

const loginAction = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://node-compy.onrender.com/login",
      credentials
    );

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userId", response.data.user._id);
    localStorage.setItem("role", response.data.user.role);

    dispatch({
      type: "LOGIN",
      payload: {
        userId: response.data.user._id,
        token: response.data.token,
        role: response.data.user.role,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

const logoutAction = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("role");
  
  dispatch({
    type: "LOGOUT",
  });
};

export default logoutAction;

const addBooks = (post, token) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://node-compy.onrender.com/books",
      post,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    dispatch({
      type: "ADD_POST",
      payload: { post: response.data.book },
    });
  } catch (error) {
    console.error("Error adding post:", error);
  }
};

const getPost = (queryData) => async (dispatch) => {
  const { language, sort, category, limit, page } = queryData;
  let old = "";
  let latest = "";
  if (category === "old") {
    old = 1;
  } else if (category === "latest") {
    latest = 1;
  }
  try {
    const response = await axios.get(
      `https://node-compy.onrender.com/books?page=${page}&limit=${limit}&language=${language}&sort=${sort}&old=${old}&latest=${latest}`
    );

    
    dispatch({
      type: "SET_POSTS",
      payload: { posts: response.data.books, totalPage:response.data.totalPage },
    });
  } catch (error) {
    console.error("Error adding post:", error);
  }
};

const editPostAction = (postId, token, updatedPost) => async (dispatch) => {
  try {
    const response = await axios.put(
      `https://node-compy.onrender.com/books/update/${postId}`,
      updatedPost,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    dispatch({
      type: "EDIT_POST",
      payload: { post: response.data.book },
    });
  } catch (error) {
    console.error("Error editing post:", error);
  }
};

const deletePostAction = (postId, token) => async (dispatch) => {
  try {
    await axios.delete(
      `https://node-compy.onrender.com/books/delete/${postId}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    await getPost();

    dispatch({
      type: "DELETE_POST",
      payload: { postId },
    });
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};

export {
  addBooks,
  getPost,
  editPostAction,
  deletePostAction,
  loginAction,
  registerAction,
  logoutAction,
};
