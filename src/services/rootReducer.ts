import { combineReducers } from '@reduxjs/toolkit';

import constructorReducer from './constructorSlice';
import ingredientsReducer from './ingredientsSlice';
import orderReducer from './orderSlice';
import userReducer from './userSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer
});