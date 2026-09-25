import { getOrdersSelector, getFeeds } from '@slices/feed-slice';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useEffect } from 'react';

import { useSelector, useDispatch } from '@services/store';

export const Feed = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const orders = useSelector(getOrdersSelector);

  useEffect(() => {
    void dispatch(getFeeds());
  }, []);

  const handleGetFeeds = (): void => {
    void dispatch(getFeeds());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
