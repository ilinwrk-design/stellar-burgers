import { OrderInfoUI, Preloader } from '@ui';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import {
  clearOrderInfo,
  getOrderByNumber
} from '../../services/orderInfoSlice';
import { useDispatch, useSelector } from '../../services/store';

import type { TIngredient } from '@utils-types';

export const OrderInfo = (): React.JSX.Element => {
  const dispatch = useDispatch();

  // Получаем номер заказа из адресной строки.
  const { number } = useParams();

  // Получаем данные заказа и список всех ингредиентов из Redux.
  const order = useSelector((state) => state.orderInfo.order);
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  useEffect(() => {
    // Загружаем данные заказа по номеру из маршрута.
    if (number) {
      void dispatch(getOrderByNumber(Number(number)));
    }

    // При закрытии страницы или модального окна очищаем данные заказа.
    return () => {
      dispatch(clearOrderInfo());
    };
  }, [dispatch, number]);

  // Подготавливаем данные заказа в формате, который нужен OrderInfoUI.
  const orderInfo = useMemo(() => {
    if (!order || !ingredients.length) {
      return null;
    }

    // Находим полную информацию об ингредиентах заказа
    // и считаем количество каждого ингредиента.
    const ingredientsInfo = order.ingredients.reduce(
      (
        acc: Record<string, TIngredient & { count: number }>,
        ingredientId
      ) => {
        const ingredient = ingredients.find(
          (item) => item._id === ingredientId
        );

        if (!ingredient) {
          return acc;
        }

        if (acc[ingredientId]) {
          acc[ingredientId].count += 1;
        } else {
          acc[ingredientId] = {
            ...ingredient,
            count: 1
          };
        }

        return acc;
      },
      {}
    );

    // Считаем общую стоимость всех ингредиентов заказа.
    const total = Object.values(ingredientsInfo).reduce(
      (sum, ingredient) => sum + ingredient.price * ingredient.count,
      0
    );

    return {
      ...order,
      ingredientsInfo,
      date: new Date(order.createdAt),
      total
    };
  }, [order, ingredients]);

  // Пока данные заказа не подготовлены, показываем загрузку.
  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};