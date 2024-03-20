import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getOrderRequest, getOrders } from '../../services/orders/slice';
import { useDispatch, useSelector } from '../../services/store';
import { getAllFeeds } from '../../services/orders/actions';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */

  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(getOrders);

  useEffect(() => {
    dispatch(getAllFeeds());
  }, []);

  // if (!orders.length) {
  //   return <Preloader />;
  // }

  const orderRequest = useSelector(getOrderRequest);

  if (orderRequest) {
    return <Preloader />;
  } else {
    return (
      <FeedUI orders={orders} handleGetFeeds={() => dispatch(getAllFeeds())} />
    );
  }
};
