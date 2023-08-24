import { FC, PropsWithChildren, useEffect } from 'react';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
} from '../../services/actions/webSocket';
import { getOrdersWsUrl } from '../../utils/burger-api';
import styles from './order-placed.module.css';
import { useAppDispatch } from '../../utils/types';

type TOrderPlaced = PropsWithChildren<{
  isAllOrders: boolean;
}>;

const OrderPlaced: FC<TOrderPlaced> = ({ children, isAllOrders }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: { url: getOrdersWsUrl(isAllOrders) },
    });
    return () => void dispatch({ type: WS_CONNECTION_STOP });
  }, [dispatch, isAllOrders]);

  return <div className={styles.section}>{children}</div>;
};

export default OrderPlaced;
