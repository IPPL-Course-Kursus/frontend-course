const initialState = {
  stats: {},
  paymentStatus: [],
  user: {},
  loading: false,
  error: null,
};

const adminDashboardReducer = (state = initialState, action) => {
switch (action.type) {
  case "FETCH_STATS_REQUEST":
    return {
      ...state,
      loading: true,
    };
  case "FETCH_STATS_SUCCESS":
    return {
      ...state,
      loading: false,
      stats: action.payload,
    };
  case "FETCH_STATS_FAILURE":
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  case "FETCH_PAYMENTS_REQUEST":
    return {
      ...state,
      loading: true,
    };
    case "FETCH_PAYMENTS_SUCCESS":
      return {
        ...state,
        loading: false,
        paymentStatus: action.payload, // Langsung menyimpan transaksi ke paymentStatus
      };
<<<<<<< HEAD
    
    
      
    
  case "FETCH_PAYMENTS_FAILURE":
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
=======
    case "FETCH_STATS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "FETCH_PAYMENTS_REQUEST":
      return {
        ...state,
        loading: true,
      };
      case "FETCH_PAYMENTS_SUCCESS":
        return {
          ...state,
          loading: false,
          paymentStatus: action.payload, // Langsung menyimpan transaksi ke paymentStatus
        };
      
      
        
      
    case "FETCH_PAYMENTS_FAILURE":
>>>>>>> 1d50dc725ca4cfa9b6ec07556cebac0b67ba88a2
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
          default:
              return state;
}
};

export default adminDashboardReducer;