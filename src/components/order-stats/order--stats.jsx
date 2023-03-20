import { useSelector } from "react-redux";
import styles from "./order-stats.module.css";

const OrderStats = () => {
  const orders = useSelector((state) => state.wsReducer.messages);
  const ordersDone = orders.orders.filter(
    (item) => item.status === "done"
  ).reverse();

  const ordersInProcess = orders.orders.filter(
    (item) => item.status !== "done"
  ).reverse();;

  return (
    <section className={styles.section}>
      <div className={styles.table}>
        <span className="text text_type_main-medium pb-6">Готовы:</span>
        <span className="text text_type_main-medium pb-6">В работе:</span>
        <div className={`${styles.orderNumber} ${styles.orderNumberDone}`}>
          {ordersDone.map((order, index) => (
            <span key={index} className="text text_type_digits-default">
              {order.number}
            </span>
          ))}
        </div>
        <div className={styles.orderNumber}>
          {ordersInProcess.map((order, index) => (
            <span key={index} className="text text_type_digits-default">
              {order.number}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.total}>
        <span className="text text_type_main-medium">
          Выполнено за всё время:
        </span>
        <span className="text text_type_digits-large">
          {orders.totalOrdersAllTime}
        </span>
      </div>
      <div className={styles.total}>
        <span className="text text_type_main-medium">
          Выполнено за сегодня:
        </span>
        <span className="text text_type_digits-large">
          {orders.totalOrdersToday}
        </span>
      </div>
    </section>
  );
};

export default OrderStats;
