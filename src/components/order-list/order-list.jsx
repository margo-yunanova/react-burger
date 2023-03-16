import styles from "./order-list.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

const OrderItem = () => {
  return (
    <section className={styles.cell}>
      <div className={`${styles.title} pt-6`}>
        <span className="text text_type_digits-default">345</span>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date("2022-10-10T17:33:32.877Z")}
        />
      </div>
      <h3 className="text text_type_main-medium">
        Death Star Starship Main бургер
      </h3>
      <div className={`${styles.total} pb-6`}>
        <div></div>
        <div className={styles.price}>
          <span className="text text_type_digits-default">480</span>
          <CurrencyIcon />
        </div>
      </div>
    </section>
  );
};

const OrderList = () => {
  return (
    <section className={styles.scroll}>
      <OrderItem />
      <OrderItem />
      <OrderItem />
    </section>
  );
};

export default OrderList;
