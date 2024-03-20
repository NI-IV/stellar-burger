import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearNewOrder,
  getOrder,
  getOrderRequest
} from '../../services/new-order/slice';
import { getAuthChecked } from '../../services/auth/slice';
import { useNavigate } from 'react-router-dom';
import { createNewOrder } from '../../services/new-order/actions';
import { clearConstruction } from '../../services/burger-construction/slice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  const constructorItems = useSelector((store) => store.burgerConstruction);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrder);
  const isAuthChecked = useSelector(getAuthChecked);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onOrderClick = () => {
    //if (!constructorItems.bun || orderRequest) return;

    if (!isAuthChecked) {
      navigate('/login');
    } else if (constructorItems.bun && constructorItems.ingredients.length) {
      const data = [
        constructorItems.bun._id,
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((item) => item._id)
      ];
      dispatch(createNewOrder(data));
    }
  };
  const closeOrderModal = () => {
    dispatch(clearNewOrder());
    dispatch(clearConstruction());
    navigate('/', { replace: true });
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

  //return null;

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
