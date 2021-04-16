  const initialState = {
    isAuth: false,
  };
  
  const user = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_AUTH':
        return {
          ...state,
          isAuth: action.isAuth,
        };
 
      default:
        return state;
    }
  };
  
  export default user;