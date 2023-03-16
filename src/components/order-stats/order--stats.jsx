import styles from "./order-stats.module.css";

const OrderStats = () => {
  return (
    <section className={styles.section}>
      <div className={styles.table}>
        <span className="text text_type_main-medium pb-6">Готовы:</span>
        <span className="text text_type_main-medium pb-6">В работе:</span>
        <div className={`${styles.orderNumber} ${styles.orderNumberDone}`}>
          <span className="text text_type_digits-default">1</span>
          <span className="text text_type_digits-default">2</span>
          <span className="text text_type_digits-default">3</span>
          <span className="text text_type_digits-default">4</span>
          <span className="text text_type_digits-default">5</span>
          <span className="text text_type_digits-default">6</span>
          <span className="text text_type_digits-default">7</span>
          <span className="text text_type_digits-default">8</span>
          <span className="text text_type_digits-default">9</span>
          <span className="text text_type_digits-default">10</span>
        </div>
        <div className={styles.orderNumber}>
          <span className="text text_type_digits-default">1</span>
          <span className="text text_type_digits-default">2</span>
          <span className="text text_type_digits-default">3</span>
          <span className="text text_type_digits-default">4</span>
          <span className="text text_type_digits-default">5</span>
          <span className="text text_type_digits-default">6</span>
          <span className="text text_type_digits-default">7</span>
          <span className="text text_type_digits-default">8</span>
          <span className="text text_type_digits-default">9</span>
          <span className="text text_type_digits-default">10</span>
        </div>
      </div>
      <div className={styles.total}>
        <span className="text text_type_main-medium">
          Выполнено за всё время:
        </span>
        <span className="text text_type_digits-large">28752</span>
      </div>
      <div className={styles.total}>
        <span className="text text_type_main-medium">
          Выполнено за сегодня:
        </span>
        <span className="text text_type_digits-large">138</span>
      </div>
    </section>
  );
};

export default OrderStats;
