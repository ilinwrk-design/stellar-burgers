import { BurgerIngredientUI } from '@ui';
import { useLocation } from 'react-router-dom';

import { addIngredient } from '../../services/constructorSlice';
import { useDispatch, useSelector } from '../../services/store';

import type { TBurgerIngredientProps } from './type';

export const BurgerIngredient = ({
  ingredient
}: TBurgerIngredientProps): React.JSX.Element => {
  const location = useLocation();
  const dispatch = useDispatch();

  const bun = useSelector((state) => state.burgerConstructor.bun);
  const constructorIngredients = useSelector(
    (state) => state.burgerConstructor.ingredients
  );

  // Для булки показываем 2, потому что она используется сверху и снизу.
  // Для остальных ингредиентов считаем количество добавлений в конструктор.
  const count =
    ingredient.type === 'bun'
      ? bun?._id === ingredient._id
        ? 2
        : 0
      : constructorIngredients.filter(
          (constructorIngredient) =>
            constructorIngredient._id === ingredient._id
        ).length;

  const handleAdd = (): void => {
    dispatch(addIngredient(ingredient));
  };

  return (
    <BurgerIngredientUI
      ingredient={ingredient}
      locationState={{ background: location }}
      handleAdd={handleAdd}
      count={count}
    />
  );
};