const initialState = {
  isAuth: false,
  email: 'None',
  username: 'None',
  image: null,
  id: -1,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_AUTH':
      console.log(state, "SET_AUTH")
      return {
        ...state,
        isAuth: action.isAuth,
      };
    case 'SET_PROFILE':
      console.log(state, "SET_PROFILE")
      return {
        ...state,
        email: action.data.email,
        username: action.data.username,
        image: action.data.image,
        id: action.data.id,
      };
    

    default:
      return state;
  }
};

export default user;