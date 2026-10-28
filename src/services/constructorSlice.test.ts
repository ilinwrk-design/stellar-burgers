import constructorReducer from './constructorSlice';

describe('Редьюсер конструктора бургера', () => {
  test('Возвращает начальное состояние при неизвестном экшене', () => {
    const state = constructorReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      bun: null,
      ingredients: [],
    });
  });
});
