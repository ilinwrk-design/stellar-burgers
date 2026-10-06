import { BurgerConstructorElementUI } from '@ui';
import { memo } from 'react';

import { removeIngredient } from '../../services/constructorSlice';
import { useDispatch } from '../../services/store';

import type { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement = memo(function BurgerConstructorElement({
  ingredient,
  index,
  totalItems
}: BurgerConstructorElementProps): React.JSX.Element {
  const dispatch = useDispatch();

  const handleMoveDown = (): void => {
    // TODO: Перемещение ингредиента вниз добавим позже.
  };

  const handleMoveUp = (): void => {
    // TODO: Перемещение ингредиента вверх добавим позже.
  };

  const handleClose = (): void => {
    dispatch(removeIngredient(ingredient));
  };

  return (
    <BurgerConstructorElementUI
      ingredient={ingredient}
      index={index}
      totalItems={totalItems}
      handleMoveUp={handleMoveUp}
      handleMoveDown={handleMoveDown}
      handleClose={handleClose}
    />
  );
});