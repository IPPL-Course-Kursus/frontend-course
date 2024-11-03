const initialState = {
    instructors: [],
    loading: false,
    error: null,
  };
  
  const instructorReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_INSTRUCTORS":
        return {
          ...state,
          instructors: action.payload,
          loading: false,
        };
      case "ADD_INSTRUCTOR":
        return {
          ...state,
          instructors: [...state.instructors, action.payload],
          loading: false,
        };
      case "UPDATE_INSTRUCTOR":
        return {
          ...state,
          instructors: state.instructors.map((instructor) =>
            instructor.id === action.payload.id ? action.payload : instructor
          ),
          loading: false,
        };
      case "DELETE_INSTRUCTOR":
        return {
          ...state,
          instructors: state.instructors.filter((instructor) => instructor.id !== action.payload),
          loading: false,
        };
      case "SET_LOADING":
        return {
          ...state,
          loading: action.payload,
        };
      case "SET_ERROR":
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      case "CLEAR_ERROR":
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  // Action creators (jika berada di file yang sama)
  export const setInstructors = (instructors) => ({
    type: "SET_INSTRUCTORS",
    payload: instructors,
  });
  
  export const setLoading = (isLoading) => ({
    type: "SET_LOADING",
    payload: isLoading,
  });
  
  export const setError = (error) => ({
    type: "SET_ERROR",
    payload: error,
  });
  
  export const clearError = () => ({
    type: "CLEAR_ERROR",
  });

// Ekspor default
export default instructorReducer;