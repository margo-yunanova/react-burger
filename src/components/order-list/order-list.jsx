import styles from "./order-list.module.css";
import { Link } from "react-router-dom";
import OrderItem from "../order-item/order-item";

const OrderList = () => {
  return (
    <section className={styles.scroll}>
      <Link className={styles.link}>
        <OrderItem />
      </Link>
      <Link className={styles.link}>
        <OrderItem />
      </Link>
      <Link className={styles.link}>
        <OrderItem />
      </Link>
    </section>
  );
};

export default OrderList;
