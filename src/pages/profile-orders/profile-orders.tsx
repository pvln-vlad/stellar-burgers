import { getOrders, getUserOrdersSelector } from '@slices/user-slice';
import { ProfileOrdersUI } from '@ui-pages';
import { useEffect } from 'react';

import { useSelector, useDispatch } from '@services/store';

export const ProfileOrders = (): React.JSX.Element => {
  const orders = useSelector(getUserOrdersSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    void dispatch(getOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
