const initialState = {
    types: [],
    typesById: {},
    courses: [],
    courseByType: [],
    courseBySearch: [],
    courseById: {},
    typesByLevel: [],
    courseByCategory: [],
    courseByUserId: [],
    courseByFilter: [],
    allCourseByUserId: [],
    allCourseLevel: [],
    courseLevelById: {},
    chaptersByCourseId: [],
    chapterById: {},
    contentByChapterId: [],
    contentById: {},
    courseUser: [],
    detailCourseUser: {},
    newRequests: [],
    requestById: {},
    loading: false,
    error: null,
  };
  
  export const mulaiKelasReducer = (state = initialState, action) => {
    switch (action.type) {
      // Loading state
      case "SET_LOADING":
        return { ...state, loading: true, error: null };
  
      // Error state
      case "SET_ERROR":
        return { ...state, loading: false, error: action.payload };
  
      // Success state for all course types
      case "GET_ALL_TYPE":
        return { ...state, loading: false, types: action.payload, error: null };
  
      // Success state for course type by ID
      case "GET_ALL_TYPE_BY_ID":
        return { ...state, loading: false, typesById: action.payload, error: null };
  
      // Success state for all courses
      case "GET_ALL_COURSE":
        return { ...state, loading: false, courses: action.payload, error: null };
  
      // Success state for courses by type ID
      case "GET_COURSE_BY_TYPE":
        return { ...state, loading: false, courseByType: action.payload, error: null };
  
      // Success state for courses by search query
      case "GET_COURSE_BY_SEARCH":
        return { ...state, loading: false, courseBySearch: action.payload, error: null };
  
      // Success state for course by ID
      case "GET_COURSE_BY_ID":
        return { ...state, loading: false, courseById: action.payload, error: null };
  
      // Success state for course types by level
      case "GET_ALL_TYPE_BY_LEVEL":
        return { ...state, loading: false, typesByLevel: action.payload, error: null };
  
      // Success state for courses by category
      case "GET_COURSE_BY_CATEGORY":
        return { ...state, loading: false, courseByCategory: action.payload, error: null };
  
      // Success state for courses by user ID
      case "GET_COURSE_BY_USER_ID":
        return { ...state, loading: false, courseByUserId: action.payload, error: null };
  
      // Success state for courses by filter
      case "GET_COURSE_BY_FILTER":
        return { ...state, loading: false, courseByFilter: action.payload, error: null };
  
      // Success state for all courses by user ID
      case "GET_ALL_COURSE_BY_USER_ID":
        return { ...state, loading: false, allCourseByUserId: action.payload, error: null };
  
      // Success state for all course levels
      case "GET_ALL_COURSE_LEVEL":
        return { ...state, loading: false, allCourseLevel: action.payload, error: null };
  
      // Success state for course level by ID
      case "GET_ALL_COURSE_LEVEL_BY_ID":
        return { ...state, loading: false, courseLevelById: action.payload, error: null };
  
      // Success state for general data
      case "GET_ALL":
        return { ...state, loading: false, allData: action.payload, error: null };
  
      // Success state for data by ID
      case "GET_BY_ID":
        return { ...state, loading: false, requestById: action.payload, error: null };
  
      // Success state for chapters by course ID
      case "GET_CHAPTER_BY_COURSE_ID":
        return { ...state, loading: false, chaptersByCourseId: action.payload, error: null };
  
      // Success state for chapter by ID
      case "GET_CHAPTER_BY_ID":
        return { ...state, loading: false, chapterById: action.payload, error: null };
  
      // Success state for content by chapter ID
      case "GET_CONTENT_BY_CHAPTER_ID":
        return { ...state, loading: false, contentByChapterId: action.payload, error: null };
  
      // Success state for content by ID
      case "GET_CONTENT_BY_ID":
        return { ...state, loading: false, contentById: action.payload, error: null };
  
      // Success state for course user
      case "GET_COURSE_USER":
        return { ...state, loading: false, courseUser: action.payload, error: null };
  
      // Success state for detail course user
      case "GET_DETAIL_COURSE_USER":
        return { ...state, loading: false, detailCourseUser: action.payload, error: null };
  
      // Success state for creating a new request
      case "CREATE_NEW_REQUEST":
        return {
          ...state,
          loading: false,
          newRequests: [...state.newRequests, action.payload],
          error: null,
        };
  
      // Success state for updating a new request
      case "UPDATE_NEW_REQUEST":
        return {
          ...state,
          loading: false,
          newRequests: state.newRequests.map((req) =>
            req.id === action.payload.id ? action.payload : req
          ),
          error: null,
        };
  
      // Success state for getting new requests
      case "GET_NEW_REQUEST":
        return { ...state, loading: false, newRequests: action.payload, error: null };
  
      // Success state for deleting a request
      case "DELETE_NEW_REQUEST":
        return {
          ...state,
          loading: false,
          newRequests: state.newRequests.filter((req) => req.id !== action.payload),
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  
  export default mulaiKelasReducer;