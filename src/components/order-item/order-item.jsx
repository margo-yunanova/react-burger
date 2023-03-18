import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-item.module.css";
import classNames from "classnames";
import IngredientImageRoundBorder from "../ingredient-image-round-border/ingredient-image-round-border";
import { useSelector } from "react-redux";

const OrderItem = ({ status }) => {
  const statusClass = classNames("text text_type_main-default", {
    [styles.orderDone]: status === "Выполнен",
  });

  const pinkBun = useSelector((state) =>
    state.ingredients.listBurgerIngredients.ingredients.find(
      (item) => item._id === "60d3b41abdacab0026a733c7"
    )
  );

  const ingredients = [0, 1, 2, 3, 4, 5, 6, 7];
  const counter = ingredients.length - 5

  return (
    <div className={styles.cell}>
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
      {status && <p className={statusClass}>{status}</p>}
      <div className={`${styles.total} pb-6`}>
        <div className={styles.ingredientsImage}>
          {ingredients.slice(0, 5).map((num) =>
            <IngredientImageRoundBorder num={num} pinkBun={pinkBun} />
          )}
          <IngredientImageRoundBorder counter={counter} pinkBun={pinkBun} />
        </div>

        <div className={styles.price}>
          <span className="text text_type_digits-default">480</span>
          <CurrencyIcon />
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
