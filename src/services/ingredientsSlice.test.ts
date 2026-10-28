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
});
