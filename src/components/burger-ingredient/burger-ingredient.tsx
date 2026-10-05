import { BurgerIngredientUI } from '@ui';
import { useLocation } from 'react-router-dom';

import { addIngredient } from '../../services/constructorSlice';
import { useDispatch } from '../../services/store';

import type { TBurgerIngredientProps } from './type';

export const BurgerIngredient = ({
  ingredient
}: TBurgerIngredientProps): React.JSX.Element => {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleAdd = (): void => {
    dispatch(addIngredient(ingredient));
  };

  return (
    <BurgerIngredientUI
      ingredient={ingredient}
      locationState={{ background: location }}
      handleAdd={handleAdd}
      count={0}
    />
  );
};