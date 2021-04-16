import { combineReducers } from 'redux';


import user from './userProfile';


const rootReducer = combineReducers({
  user
});

export default rootReducer;