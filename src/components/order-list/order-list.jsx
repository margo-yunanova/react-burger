import styles from "./order-list.module.css";
import { Link, useLocation } from "react-router-dom";
import OrderItem from "../order-item/order-item";
import { useSelector } from "react-redux";

const OrderList = () => {
  const location = useLocation();
  const orders = useSelector((state) => state.wsReducer.messages.orders);

  return (
    <section className={styles.scroll}>
      {orders.length > 0 &&
        orders.map((order, index) => (
          <Link
            key={order._id}
            to={`/feed/${order._id}`}
            state={{ backgroundLocation: location }}
            className={`${styles.link} ${index > 0 && "pt-4"}`}
          >
            <OrderItem order={order} isStatusVisible={false}/>
          </Link>
        ))}
    </section>
  );
};

export default OrderList;
