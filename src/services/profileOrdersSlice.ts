import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getOrdersApi } from '@utils/burger-api';

import type { TOrder } from '@utils-types';

type TProfileOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TProfileOrdersState = {
  orders: [],
  isLoading: false,
  error: null
};

// Получаем историю заказов авторизованного пользователя.
export const getProfileOrders = createAsyncThunk(
  'profileOrders/getProfileOrders',
  getOrdersApi
);

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Запрос истории заказов отправлен.
      .addCase(getProfileOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      // История заказов успешно получена.
      .addCase(getProfileOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })

      // При загрузке истории произошла ошибка.
      .addCase(getProfileOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message ?? 'Не удалось загрузить историю заказов';
      });
  }
});

export default profileOrdersSlice.reducer;