import { combineReducers } from '@reduxjs/toolkit';

import ingredientsReducer from './ingredientsSlice';
import userReducer from './userSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer
});
