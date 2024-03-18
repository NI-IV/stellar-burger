import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getFeeds } from '../../services/feeds/slice';
import { useDispatch, useSelector } from '../../services/store';
import { getAllFeeds } from '../../services/feeds/actions';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */

  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(getFeeds);

  useEffect(() => {
    dispatch(getAllFeeds());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(getAllFeeds())} />
  );
};
