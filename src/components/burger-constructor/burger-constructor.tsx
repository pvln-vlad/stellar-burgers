import { getConstructorSelector, clearConstructor } from '@slices/constructor-slice';
import {
  getOrderRequestSelector,
  getOrderModalDataSelector,
  orderBurger,
  clearOrder,
} from '@slices/order-slice';
import { BurgerConstructorUI } from '@ui';
import { useMemo } from 'react';

import { useSelector, useDispatch } from '@services/store';

import type { TConstructorIngredient, TOrder } from '@utils-types';

export const BurgerConstructor = (): React.JSX.Element | null => {
  const dispatch = useDispatch();
  const constructorItems = useSelector(getConstructorSelector);
  const orderRequest = useSelector(getOrderRequestSelector);
  const orderModalData: TOrder | null = useSelector(getOrderModalDataSelector);

  const onOrderClick = (): void => {
    if (!constructorItems.bun || orderRequest) return;
    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id,
    ];
    void dispatch(orderBurger(ingredientIds));
  };

  const closeOrderModal = (): void => {
    void dispatch(clearOrder());
    void dispatch(clearConstructor());
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
