import { combineReducers } from '@reduxjs/toolkit';

import constructorReducer from './constructorSlice';
import feedReducer from './feedSlice';
import ingredientsReducer from './ingredientsSlice';
import orderInfoReducer from './orderInfoSlice';
import orderReducer from './orderSlice';
import profileOrdersReducer from './profileOrdersSlice';
import userReducer from './userSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  feed: feedReducer,
  profileOrders: profileOrdersReducer,
  orderInfo: orderInfoReducer
});