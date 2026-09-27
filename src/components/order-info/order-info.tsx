import { getOrdersSelector } from '@slices/feed-slice';
import { getIngredientsSelector } from '@slices/ingredients-slice';
import { getOrderByNumber, getOrderDataSelector } from '@slices/order-slice';
import { Preloader, OrderInfoUI } from '@ui';
import { useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector, useDispatch } from '@services/store';

import type { TIngredient } from '@utils-types';

export const OrderInfo = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const { number } = useParams();
  const orders = useSelector(getOrdersSelector);
  const ingredients = useSelector(getIngredientsSelector);
  const loadedOrder = useSelector(getOrderDataSelector);

  const orderFromFeed = orders.find((order) => order.number === Number(number));
  const orderData = orderFromFeed ?? loadedOrder;

  useEffect(() => {
    if (!orderFromFeed) {
      void dispatch(getOrderByNumber(Number(number)));
    }
  }, [number, orderFromFeed]);

  /**
   * использование useMemo не обязательно
   */
  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = Record<string, TIngredient & { count: number }>;

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1,
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total,
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
