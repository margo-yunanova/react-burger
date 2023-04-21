import { useSelector } from 'react-redux';
import styles from './order-stats.module.css';
import { FC } from 'react';

const OrderStats: FC = () => {
  const messages = useSelector((state: any) => state.wsReducer.messages);

  if (!messages.orders) {
    return null;
  }

  const ordersDone = messages.orders
    .filter((item:any) => item.status === 'done')
    .reverse();

  const ordersInProcess = messages.orders
    .filter((item:any) => item.status !== 'done')
    .reverse();

  return (
    <section className={styles.section}>
      <div className={styles.table}>
        <span className="text text_type_main-medium pb-6">Готовы:</span>
        <span className="text text_type_main-medium pb-6">В работе:</span>
        <div className={`${styles.orderNumber} ${styles.orderNumberDone}`}>
          {ordersDone.map((order:any, index: number) => (
            <span key={index} className="text text_type_digits-default">
              {order.number}
            </span>
          ))}
        </div>
        <div className={styles.orderNumber}>
          {ordersInProcess.map((order: any, index: number) => (
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
          {messages.totalOrdersAllTime}
        </span>
      </div>
      <div className={styles.total}>
        <span className="text text_type_main-medium">
          Выполнено за сегодня:
        </span>
        <span className="text text_type_digits-large">
          {messages.totalOrdersToday}
        </span>
      </div>
    </section>
  );
};

export default OrderStats;
