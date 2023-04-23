import { FC, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import OrderItem from '../components/order-item/order-item';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
} from '../services/actions/webSocket';
import { getOrdersWsUrl } from '../utils/burger-api';
import styles from './profile-orders.module.css';
import { useAppDispatch, useAppSelector } from '../utils/types';

const ProfileOrders: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.wsReducer.messages.orders);
  const success = useAppSelector((state) => state.wsReducer.messages.success);

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: { url: getOrdersWsUrl(false) },
    });
    return () => void dispatch({ type: WS_CONNECTION_STOP });
  }, [dispatch]);

  if (!success || !orders) {
    return null;
  }

  return (
    <div className={styles.scroll}>
      {orders.length > 0 &&
        orders.map((order, index) => (
          <Link
            key={order._id}
            to={`/profile/orders/${order._id}`}
            state={{ backgroundLocation: location }}
            className={`${styles.link} ${index > 0 && 'pt-4'}`}
          >
            <OrderItem order={order} isStatusVisible={true} />
          </Link>
        ))}
    </div>
  );
};

export default ProfileOrders;
