import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import OrderItem from "../components/order-item/order-item";
import { WS_CONNECTION_START, WS_CONNECTION_STOP } from "../services/actions/webSocket";
import { wsUrl } from "../utils/constants";
import styles from "./profile-orders.module.css";

const ProfileOrders = () => {

  const location = useLocation();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.wsReducer.messages.orders);
  const success = useSelector((state) => state.wsReducer.messages.success);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: { url: wsUrl }});
    return () => dispatch({ type: WS_CONNECTION_STOP });
  }, [dispatch]);

  if (!success || !orders) {
    return null
  }

  return (
    <div className={styles.scroll}>
      {orders.length > 0 &&
        orders.map((order, index) => (
          <Link
            key={order._id}
            to={`/profile/orders/${order._id}`}
            state={{ backgroundLocation: location }}
            className={`${styles.link} ${index > 0 && "pt-4"}`}
          >
            <OrderItem order={order} isStatusVisible={true}/>
          </Link>
        ))}
    </div>
  );
};

export default ProfileOrders;
