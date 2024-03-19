import { FC, memo } from 'react';

import { OrdersListProps } from './type';
import { OrdersListUI, Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { getOrderRequest } from '../../services/orders/slice';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const orderRequest = useSelector(getOrderRequest);

  if (orderRequest) {
    return <Preloader />;
  }
  return <OrdersListUI orderByDate={orderByDate} />;
});
