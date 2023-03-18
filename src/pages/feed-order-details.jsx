import styles from "./feed-order-details.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import IngredientImageRoundBorder from "../components/ingredient-image-round-border/ingredient-image-round-border";

const Ingredient = ({ pinkBun }) => {
  return (
    <div className={styles.ingredient}>
      <IngredientImageRoundBorder pinkBun={pinkBun} />
      <p className="text text_type_main-medium">Флюоресцентная булка R2-D3</p>
      <div className={styles.price}>
        <p className="text text_type_digits-default">2x480</p>
        <CurrencyIcon />
      </div>
    </div>
  );
};

const FeedOrderDetails = () => {
  const pinkBun = useSelector((state) =>
    state.ingredients.listBurgerIngredients.ingredients.find(
      (item) => item._id === "60d3b41abdacab0026a733c7"
    )
  );
  return (
    <section className={styles.section}>
      <p
        className={`${styles.orderNumber} text text_type_digits-default pb-10`}
      >
        03494858
      </p>
      <p className="text text_type_main-medium pb-3">
        Black Hole Singularity острый бургер
      </p>
      <p
        className={`{styles.orderNumberDone} text text_type_main-default pb-15`}
      >
        Выполнен
      </p>
      <p className="text text_type_main-medium pb-6">Состав:</p>
      <div className={styles.scroll}>
        <Ingredient pinkBun={pinkBun} />
      </div>
      <div className={`${styles.total} pt-6`}>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date("2022-10-10T17:33:32.877Z")}
        />
        <div className={styles.price}>
          <p className="text text_type_digits-default">480</p>
          <CurrencyIcon />
        </div>
      </div>
    </section>
  );
};

export default FeedOrderDetails;
