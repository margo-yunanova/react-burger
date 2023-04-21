import { useSelector } from 'react-redux';
import styles from './order-details.module.css';
import { FC } from 'react';

const OrderDetails: FC = () => {
  const number = useSelector((store: any) => store.orderDetails.order.number);

  return (
    <div className={styles.popup}>
      <p className="text text_type_digits-large pt-30 pb-8">{number}</p>
      <p className="text text_type_main-medium pb-15">идентификатор заказа</p>
      <div className={styles.checkbox}></div>
      <p className="text text_type_main-default pt-15 pb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive pb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
