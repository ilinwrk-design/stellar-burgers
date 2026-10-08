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