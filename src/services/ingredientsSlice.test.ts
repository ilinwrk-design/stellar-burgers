import type { TIngredient } from '@utils-types';
import ingredientsReducer, { getIngredients } from './ingredientsSlice';

describe('Редьюсер ингредиентов', () => {
  test('Возвращает начальное состояние при неизвестном экшене', () => {
    const state = ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      ingredients: [],
      isLoading: false,
      error: null,
    });
  });
  test('Устанавливает состояние загрузки при отправке запроса', () => {
    const state = ingredientsReducer(
      {
        ingredients: [],
        isLoading: false,
        error: 'Ошибка загрузки',
      },
      getIngredients.pending('requestId')
    );

    expect(state).toEqual({
      ingredients: [],
      isLoading: true,
      error: null,
    });
  });

  test('Сохраняет ингредиенты после успешного запроса', () => {
    const ingredients: TIngredient[] = [
      {
        _id: 'test-bun-1',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://example.com/bun.png',
        image_mobile: 'https://example.com/bun-mobile.png',
        image_large: 'https://example.com/bun-large.png',
      },
    ];

    const state = ingredientsReducer(
      {
        ingredients: [],
        isLoading: true,
        error: null,
      },
      getIngredients.fulfilled(ingredients, 'requestId')
    );

    expect(state).toEqual({
      ingredients,
      isLoading: false,
      error: null,
    });
  });
  test('Сохраняет ошибку при неудачном запросе', () => {
    const state = ingredientsReducer(
      {
        ingredients: [],
        isLoading: true,
        error: null,
      },
      getIngredients.rejected(new Error('Ошибка сервера'), 'requestId')
    );

    expect(state).toEqual({
      ingredients: [],
      isLoading: false,
      error: 'Ошибка сервера',
    });
  });
});
