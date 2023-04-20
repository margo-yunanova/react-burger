import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
} from '../../services/actions/webSocket';
import { getOrdersWsUrl } from '../../utils/burger-api';
import styles from './order-placed.module.css';

type TOrderPlaced = {
  children: React.ReactNode;
  isAllOrders: boolean;
}

const OrderPlaced: FC<TOrderPlaced> = ({ children, isAllOrders }) => {
  const dispatch = useDispatch();

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
