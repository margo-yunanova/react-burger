import styles from "./order-list.module.css";
import { Link } from "react-router-dom";
import OrderItem from "../order-item/order-item";
import { useSelector } from "react-redux";

const OrderList = () => {
  const orders = useSelector((state) => state.wsReducer.messages.orders);

  return (
    <section className={styles.scroll}>
      {orders.length > 0 &&
        orders.map((order, index) => (
          <Link
            key={index}
            className={`${styles.link} ${index > 0 && "pt-4"}`}
          >
            <OrderItem order={order} isStatusVisible={false}/>
          </Link>
        ))}
    </section>
  );
};

export default OrderList;
