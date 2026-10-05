import { BurgerConstructorUI } from '@ui';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSelector } from '../../services/store';

import type { TConstructorIngredient, TOrder } from '@utils-types';

export const BurgerConstructor = (): React.JSX.Element | null => {
  const navigate = useNavigate();
  const location = useLocation();

  const constructorItems = useSelector(
    (state) => state.burgerConstructor
  );
  const user = useSelector((state) => state.user.user);

  // Эти данные подключим к Redux, когда будем делать оформление заказа.
  const orderRequest = false;
  const orderModalData: TOrder | null = null;

  const onOrderClick = (): void => {
    if (!constructorItems.bun || orderRequest) return;

    // Оформлять заказ может только авторизованный пользователь.
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