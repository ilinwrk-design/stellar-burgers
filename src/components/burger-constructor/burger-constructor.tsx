import { BurgerConstructorUI } from '@ui';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { clearConstructor } from '../../services/constructorSlice';
import {
  clearOrderModalData,
  createOrder
} from '../../services/orderSlice';
import { useDispatch, useSelector } from '../../services/store';

import type { TConstructorIngredient } from '@utils-types';

export const BurgerConstructor = (): React.JSX.Element | null => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const constructorItems = useSelector(
    (state) => state.burgerConstructor
  );
  const user = useSelector((state) => state.user.user);

  const orderRequest = useSelector(
    (state) => state.order.orderRequest
  );
  const orderModalData = useSelector(
    (state) => state.order.orderModalData
  );

  const onOrderClick = async (): Promise<void> => {
    if (!constructorItems.bun || orderRequest) {
      return;
    }

    // Оформлять заказ может только авторизованный пользователь.
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(
        (ingredient) => ingredient._id
      ),
      constructorItems.bun._id
    ];

    try {
      await dispatch(createOrder(ingredientIds)).unwrap();

      // После успешного оформления заказа очищаем конструктор.
      dispatch(clearConstructor());
    } catch {
      // Ошибка запроса сохраняется в orderSlice.
    }
  };

  const closeOrderModal = (): void => {
    dispatch(clearOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (sum: number, ingredient: TConstructorIngredient) =>
          sum + ingredient.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};