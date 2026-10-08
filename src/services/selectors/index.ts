import type { RootState } from '../store';

// Получаем данные текущего пользователя.
export const selectUser = (state: RootState) => state.user.user;

// Получаем список ингредиентов.
export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;

// Получаем содержимое конструктора.
export const selectBurgerConstructor = (state: RootState) =>
  state.burgerConstructor;