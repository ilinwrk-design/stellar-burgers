import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
} from './constructorSlice';
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
  test('Добавляет начинку в конструктор', () => {
    const filling: TIngredient = {
      _id: 'test-main-1',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://example.com/main.png',
      image_mobile: 'https://example.com/main-mobile.png',
      image_large: 'https://example.com/main-large.png',
    };

    const state = constructorReducer(
      { bun: null, ingredients: [] },
      addIngredient(filling)
    );

    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(expect.objectContaining(filling));
  });
  test('Удаляет начинку из конструктора', () => {
    const filling = {
      _id: 'test-main-1',
      id: 'filling-1',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main' as const,
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://example.com/main.png',
      image_mobile: 'https://example.com/main-mobile.png',
      image_large: 'https://example.com/main-large.png',
    };

    const state = constructorReducer(
      {
        bun: null,
        ingredients: [filling],
      },
      removeIngredient(filling)
    );

    expect(state.ingredients).toEqual([]);
    expect(state.bun).toBeNull();
  });
  test('Изменение порядка начинок в конструкторе', () => {
    const firstIngredient = {
      _id: 'test-main-1',
      id: 'filling-1',
      name: 'Первая начинка',
      type: 'main' as const,
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 100,
      price: 100,
      image: 'https://example.com/first.png',
      image_mobile: 'https://example.com/first-mobile.png',
      image_large: 'https://example.com/first-large.png',
    };

    const secondIngredient = {
      ...firstIngredient,
      _id: 'test-main-2',
      id: 'filling-2',
      name: 'Вторая начинка',
    };

    const state = constructorReducer(
      {
        bun: null,
        ingredients: [firstIngredient, secondIngredient],
      },
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(state.ingredients).toEqual([secondIngredient, firstIngredient]);
  });
});
