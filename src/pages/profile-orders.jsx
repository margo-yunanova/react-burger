import OrderItem from "../components/order-item/order-item";
import styles from "./profile-orders.module.css";

const ProfileOrders = ({ status }) => {
  return (
    <div className={styles.scroll}>
      <OrderItem status={"Выполнен"} />
      <OrderItem status={"Создан"} />
      <OrderItem status={"Готовится"} />
    </div>
  );
};

export default ProfileOrders;
