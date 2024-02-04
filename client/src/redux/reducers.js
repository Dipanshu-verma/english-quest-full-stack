const initialState = {
    userId:  localStorage.getItem("userId")||null,
    token:  localStorage.getItem("token") ||null,
    role:   localStorage.getItem("role") || null,
    books: [],
    totalPage:null
   
  };
 
  
  export const storeReducer = (state = initialState, action) => {
    console.log(state);
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          userId: action.payload.userId,
          token: action.payload.token,
          role:action.payload.role
        };
  
      case 'LOGOUT':
        return {
          ...state,
          userId: null,
          token: null,
          role:null,
        };
  
      case 'SET_POSTS':
        return {
          ...state,
          books: action.payload.posts,
          totalPage:action.payload.totalPage,
        };
  
      case 'ADD_POST':
        return {
          ...state,
          books: [...state.books, action.payload.post],
        };
  
      case 'EDIT_POST':
        const updatedbooks = state.books.map((post) =>
          post._id === action.payload.post._id ? action.payload.post : post
        );
        return {
          ...state,
          books: updatedbooks,
          
        };
  
      case 'DELETE_POST':
        const remainingbooks = state.books.filter(
          (post) => post._id !== action.payload.postId
        );
        return {
          ...state,
          books: remainingbooks,
        };
  
      default:
        return state;
    }
  };
  
  export default storeReducer;
  