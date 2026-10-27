import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { orderBurgerApi } from '@utils/burger-api';

import type { TOrder } from '@utils-types';

type TOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
};

const initialState: TOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};

// Отправляем заказ на сервер.
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);

    return response.order;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // Закрываем модальное окно с оформленным заказом.
    clearOrderModalData: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Запрос на оформление заказа отправлен.
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })

      // Заказ успешно оформлен.
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })

      // При оформлении заказа произошла ошибка.
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message ?? 'Не удалось оформить заказ';
      });
  }
});

export const { clearOrderModalData } = orderSlice.actions;

export default orderSlice.reducer;