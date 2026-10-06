import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { useEffect } from 'react';

import { getProfileOrders } from '../../services/profileOrdersSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.profileOrders.orders);
  const isLoading = useSelector(
    (state) => state.profileOrders.isLoading
  );

  useEffect(() => {
    void dispatch(getProfileOrders());
  }, [dispatch]);

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};