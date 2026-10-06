import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useEffect } from 'react';

import { getFeed } from '../../services/feedSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.feed.orders);
  const isLoading = useSelector((state) => state.feed.isLoading);

  useEffect(() => {
    void dispatch(getFeed());
  }, [dispatch]);

  const handleGetFeeds = (): void => {
    void dispatch(getFeed());
  };

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};