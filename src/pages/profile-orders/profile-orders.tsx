import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders as getUserOrders } from '../../services/orders/slice';
import { getAllUserOrders } from '../../services/orders/actions';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getUserOrders);

  useEffect(() => {
    dispatch(getAllUserOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
