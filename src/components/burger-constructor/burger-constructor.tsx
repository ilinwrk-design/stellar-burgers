import { BurgerConstructorUI } from '@ui';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSelector } from '../../services/store';

import type { TConstructorIngredient, TConstructorState, TOrder } from '@utils-types';

export const BurgerConstructor = (): React.JSX.Element | null => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.user.user);

  /** TODO: Взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems: TConstructorState = {
    bun: null,
    ingredients: [],
  };
  const orderRequest = false;
  const orderModalData: TOrder | null = null;

  const onOrderClick = (): void => {
    if (!constructorItems.bun || orderRequest) return;

    // Оформлять заказ могут только авторизованные пользователи.
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    // TODO: Оформить заказ
  };

  const closeOrderModal = (): void => {
    // TODO: Закрыть модальное окно и сбросить заказ
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
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
