import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getFeedsApi } from '@utils/burger-api';

import type { TOrder } from '@utils-types';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

// Получаем общую ленту заказов с сервера.
export const getFeed = createAsyncThunk('feed/getFeed', getFeedsApi);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Запрос ленты отправлен.
      .addCase(getFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      // Лента успешно получена.
      .addCase(getFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })

      // При загрузке ленты произошла ошибка.
      .addCase(getFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message ?? 'Не удалось загрузить ленту заказов';
      });
  }
});

export default feedSlice.reducer;