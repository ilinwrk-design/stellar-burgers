import constructorReducer, { addIngredient } from './constructorSlice';
import type { TIngredient } from '@utils-types';

describe('Редьюсер конструктора бургера', () => {
  test('Возвращает начальное состояние при неизвестном экшене', () => {
    const state = constructorReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      bun: null,
      ingredients: [],
    });
  });
  test('Добавляет булку в конструктор', () => {
    const bun: TIngredient = {
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
    };

    const state = constructorReducer({ bun: null, ingredients: [] }, addIngredient(bun));

    expect(state.bun).toEqual(expect.objectContaining(bun));
    expect(state.ingredients).toEqual([]);
  });
});
