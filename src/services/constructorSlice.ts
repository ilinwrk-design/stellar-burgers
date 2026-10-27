import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

import type {
  TConstructorIngredient,
  TConstructorState,
  TIngredient
} from '@utils-types';

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    // Добавляем ингредиент в конструктор.
    addIngredient: {
      reducer: (
        state,
        action: PayloadAction<TConstructorIngredient>
      ) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
          return;
        }

        state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: nanoid()
        }
      })
    },

    // Удаляем начинку или соус из конструктора.
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },

    // Меняем местами ингредиенты в конструкторе.
    moveIngredient: (
      state,
      action: PayloadAction<{
        fromIndex: number;
        toIndex: number;
      }>
    ) => {
      const { fromIndex, toIndex } = action.payload;

      const [movedIngredient] = state.ingredients.splice(fromIndex, 1);

      state.ingredients.splice(toIndex, 0, movedIngredient);
    },

    // Очищаем конструктор после успешного оформления заказа.
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;