const apiUrl = import.meta.env.VITE_REACT_API_ADDRESS;

// Fetch all course types
export const fetchAllTypes = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(${apiUrl}course-types/);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch(getAllType(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch course type by ID
export const fetchTypeById = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(${apiUrl}course-types/${id});
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch(getAllTypeById(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch all courses
export const fetchAllCourses = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(${apiUrl}courses/);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch(getAllCourse(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch courses by type ID
export const fetchCourseByType = (typeId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(${apiUrl}courses/type/${typeId});
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch(getCourseByType(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch courses by search query
export const fetchCourseBySearch = (query) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(${apiUrl}courses/search?q=${query});
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch(getCourseBySearch(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch course by ID
export const fetchCourseById = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(${apiUrl}courses/${id});
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch(getCourseById(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch all course types by level
export const fetchAllTypesByLevel = (levelId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(${apiUrl}course-types/level/${levelId});
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch(getAllTypeByLevel(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch courses by category ID
export const fetchCourseByCategory = (categoryId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(${apiUrl}courses/category/${categoryId});
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch(getCourseByCategory(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch courses by user ID
export const fetchCourseByUserId = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(${apiUrl}courses/user/${userId});
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch(getCourseByUserId(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch courses by filter parameters
export const fetchCourseByFilter = (filterParams) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(${apiUrl}courses/filter?${filterParams});
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch(getCourseByFilter(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch all courses for a user by their ID
export const fetchAllCoursesByUserId = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(${apiUrl}courses/user/all/${userId});
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch(getAllCourseByUserId(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch all course levels
export const fetchAllCourseLevels = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(${apiUrl}course-levels/);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch(getAllCourseLevel(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch course level by ID
export const fetchAllCourseLevelsById = (levelId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(${apiUrl}course-levels/${levelId});
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch(getAllCourseLevelById(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch all data (general)
export const fetchAll = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(${apiUrl}all-data/);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch(getAll(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch data by ID
export const fetchById = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(${apiUrl}data/${id});
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch(getById(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch chapters by course ID
export const fetchChapterByCourseId = (courseId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(${apiUrl}chapters/course/${courseId});
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch(getChapterByCourseId(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch chapter by ID
export const fetchChapterById = (chapterId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(${apiUrl}chapters/${chapterId});
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch(getChapterById(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch content by chapter ID
export const fetchContentByChapterId = (chapterId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(${apiUrl}contents/chapter/${chapterId});
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch(getContentByChapterId(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch content by ID
export const fetchContentById = (contentId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(${apiUrl}contents/${contentId});
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch(getContentById(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch course user
export const fetchCourseUser = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(${apiUrl}courses/user/${userId});
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch(getCourseUser(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch detail course user
export const fetchDetailCourseUser = (courseUserId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(${apiUrl}course-user/${courseUserId});
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch(getDetailCourseUser(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Create a new request
export const createNewRequest = (requestData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(${apiUrl}requests/, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch(createNewRequest(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Update a new request
export const updateNewRequest = (requestId, requestData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(${apiUrl}requests/${requestId}, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch(updateNewRequest(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch new requests
export const fetchNewRequests = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(${apiUrl}requests/);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch(getNewRequest(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Delete a request
export const deleteNewRequest = (requestId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await fetch(${apiUrl}requests/${requestId}, { method: "DELETE" });
    dispatch(deleteNewRequest(requestId));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};