const initialState = {
    stats: {},
    paymentStatus: [],
    user: {},
    loading: false,
    error: null,
};

const instrukturDashboardReducers = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_stats_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_stats_SUCCESS":
      return {
        ...state,
        loading: false,
        stats: action.payload,
      };
    case "FETCH_stats_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "FETCH_payments_REQUEST":
      return {
        ...state,
        loading: true,
      };
      case "FETCH_payments_SUCCESS":
        return {
          ...state,
          loading: false,
          paymentStatus: action.payload.data, // Ambil data dari payload
        };
      
    case "FETCH_payments_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      case "FETCH_user_REQUEST":
        return {
          ...state,
          loading: true,
        };
      case "FETCH_user_SUCCESS":
        return {
          ...state,
          loading: false,
          user: action.payload.data,
        };
      case "FETCH_user_FAILURE":
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
            default:
                return state;
  }
};

export default instrukturDashboardReducers;