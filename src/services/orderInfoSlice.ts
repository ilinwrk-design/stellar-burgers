//отдельный slice сделан для:
//1) детали заказа нужны сразу в двух местах;
//2) запрос /orders/:number уже готов в starter kit;
//3) компонент OrderInfo не должен сам напрямую обращаться к API.


import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getOrderByNumberApi } from '@utils/burger-api';

import type { TOrder } from '@utils-types';

type TOrderInfoState = {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderInfoState = {
  order: null,
  isLoading: false,
  error: null
};

// Получаем данные конкретного заказа по его номеру.
export const getOrderByNumber = createAsyncThunk(
  'orderInfo/getOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);

    return response.orders[0];
  }
);

const orderInfoSlice = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {
    // Очищаем данные предыдущего заказа.
    clearOrderInfo: (state) => {
      state.order = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Запрос данных заказа отправлен.
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      // Данные заказа успешно получены.
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })

      // При загрузке заказа произошла ошибка.
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message ?? 'Не удалось загрузить данные заказа';
      });
  }
});

export const { clearOrderInfo } = orderInfoSlice.actions;

export default orderInfoSlice.reducer;