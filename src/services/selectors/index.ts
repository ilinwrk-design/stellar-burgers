import type { RootState } from '../store';

// Получаем данные текущего пользователя.
export const selectUser = (state: RootState) => state.user.user;

// Получаем список ингредиентов.
export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;

// Получаем состояние загрузки ингредиентов.
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;

// Получаем ошибку загрузки ингредиентов.
export const selectIngredientsError = (state: RootState) =>
  state.ingredients.error;

// Получаем содержимое конструктора.
export const selectBurgerConstructor = (state: RootState) =>
  state.burgerConstructor;

// Получаем состояние отправки заказа.
export const selectOrderRequest = (state: RootState) =>
  state.order.orderRequest;

// Получаем данные заказа для модального окна.
export const selectOrderModalData = (state: RootState) =>
  state.order.orderModalData;

// Получаем состояние общей ленты заказов.
export const selectFeed = (state: RootState) => state.feed;

// Получаем заказы из общей ленты.
export const selectFeedOrders = (state: RootState) => state.feed.orders;

// Получаем состояние загрузки ленты.
export const selectFeedLoading = (state: RootState) =>
  state.feed.isLoading;

// Получаем историю заказов пользователя.
export const selectProfileOrders = (state: RootState) =>
  state.profileOrders.orders;

// Получаем состояние загрузки истории заказов.
export const selectProfileOrdersLoading = (state: RootState) =>
  state.profileOrders.isLoading;

// Получаем подробности выбранного заказа.
export const selectOrderInfo = (state: RootState) =>
  state.orderInfo.order;