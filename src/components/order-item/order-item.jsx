import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-item.module.css";
import classNames from "classnames";
import IngredientImageRoundBorder from "../ingredient-image-round-border/ingredient-image-round-border";
import { useSelector } from "react-redux";
import { statusOrderName } from "../../utils/constants";

const OrderItem = ({ order, isStatusVisible }) => {
  const statusClass = classNames("text text_type_main-default", {
    [styles.orderDone]: order.status === "done",
  });

  const ingredients = useSelector(
    (state) => state.ingredients.listBurgerIngredients.ingredients
  );

  const counter = order.ingredients.length - 5;

  const totalOrder = order.ingredients.reduce((sum, id) => {
    return sum + ingredients.find((item) => id === item._id).price;
  }, 0);

  return (
    <div className={styles.cell}>
      <div className={`${styles.title} pt-6`}>
        <span className="text text_type_digits-default">{order.number}</span>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date(order.createdAt)}
        />
      </div>
      <h3 className="text text_type_main-medium">{order.name}</h3>
      {isStatusVisible && (
        <p className={statusClass}>{statusOrderName[order.status]}</p>
      )}
      <div className={`${styles.total} pb-6`}>
        <div className={styles.ingredientsImage}>
          {order.ingredients.slice(0, 6).map((id, index) => (
            <IngredientImageRoundBorder
              key={index}
              id={id}
              index={index}
              counter={index > 4 && counter}
            />
          ))}
        </div>

        <div className={styles.price}>
          <span className="text text_type_digits-default">{totalOrder}</span>
          <CurrencyIcon />
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
