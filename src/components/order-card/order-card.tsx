import { OrderCardUI } from '@ui';
import { memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { selectIngredients } from '../../services/selectors';
import { useSelector } from '../../services/store';

import type { OrderCardProps } from './type';
import type { TIngredient } from '@utils-types';

const maxIngredients = 6;

export const OrderCard = memo(function OrderCard({
  order
}: OrderCardProps): React.JSX.Element | null {
  const location = useLocation();

  // Получаем полный список ингредиентов из Redux.
  const ingredients = useSelector(selectIngredients);

  const orderInfo = useMemo(() => {
    if (!ingredients.length) {
      return null;
    }

    // По id из заказа находим полную информацию об ингредиентах.
    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredient[], ingredientId: string) => {
        const ingredient = ingredients.find(
          (item) => item._id === ingredientId
        );

        if (ingredient) {
          acc.push(ingredient);
        }

        return acc;
      },
      []
    );

    // Считаем полную стоимость заказа.
    const total = ingredientsInfo.reduce(
      (sum, ingredient) => sum + ingredient.price,
      0
    );

    // В карточке показываем только ограниченное количество ингредиентов.
    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);

    const remains =
      ingredientsInfo.length > maxIngredients
        ? ingredientsInfo.length - maxIngredients
        : 0;

    const date = new Date(order.createdAt);

    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date
    };
  }, [order, ingredients]);

  if (!orderInfo) {
    return null;
  }

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={maxIngredients}
      locationState={{ background: location }}
    />
  );
});