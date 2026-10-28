import ingredientsReducer from './ingredientsSlice';

describe('Редьюсер ингредиентов', () => {
  test('Возвращает начальное состояние при неизвестном экшене', () => {
    const state = ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      ingredients: [],
      isLoading: false,
      error: null,
    });
  });
});
