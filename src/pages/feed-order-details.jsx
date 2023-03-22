import styles from "./feed-order-details.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import IngredientImageRoundBorder from "../components/ingredient-image-round-border/ingredient-image-round-border";
import { useParams } from "react-router";
import { statusOrderName } from "../utils/constants";

const Ingredient = ({ id, index, quantity }) => {
  const ingredients = useSelector(
    (state) => state.ingredients.listBurgerIngredients.ingredients
  );

  const ingredient = ingredients.find((item) => item._id === id);

  return (
    <div className={`${styles.ingredient} ${index > 0 && "pt-4"}`}>
      <IngredientImageRoundBorder id={ingredient._id} />
      <p className="text text_type_main-medium">{ingredient.name}</p>
      <div className={styles.price}>
        <p className="text text_type_digits-default">{`${quantity} x ${ingredient.price}`}</p>
        <CurrencyIcon />
      </div>
    </div>
  );
};

const FeedOrderDetails = () => {
  const { id } = useParams();

  const orders = useSelector((state) => state.wsReducer.messages.orders);

  const ingredients = useSelector(
    (state) => state.ingredients.listBurgerIngredients.ingredients
  );

  const success = useSelector(
    (state) => state.ingredients.listBurgerIngredients.success
  );

  const order = orders.find((item) => item._id === id);

  if (!success || !order) {
    return null;
  }

  const commonQuantityUniqueIngredients = {}

  for (const id of order?.ingredients) {
    commonQuantityUniqueIngredients[id] = (commonQuantityUniqueIngredients[id] ?? 0) + 1
  }

  const uniqueId = Object.keys(commonQuantityUniqueIngredients)


  const totalOrder = order.ingredients.reduce((sum, id) => {
    return sum + ingredients.find((item) => id === item._id).price;
  }, 0);

  return (
    <section className={styles.section}>
      <p
        className={`${styles.orderNumber} text text_type_digits-default pb-10`}
      >
        {`#${order?.number}`}
      </p>
      <p className="text text_type_main-medium pb-3">{order?.name}</p>
      <p
        className={`${styles.orderNumberDone} text text_type_main-default pb-15`}
      >
        {statusOrderName[order?.status]}
      </p>
      <p className="text text_type_main-medium pb-6">Состав:</p>
      <div className={styles.scroll}>
        {uniqueId.map((id, index) => (
          <Ingredient key={index} id={id} index={index} quantity={commonQuantityUniqueIngredients[id]}/>
        ))}
      </div>
      <div className={`${styles.total} pt-6`}>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date(order?.createdAt)}
        />
        <div className={styles.price}>
          <p className="text text_type_digits-default">{totalOrder}</p>
          <CurrencyIcon />
        </div>
      </div>
    </section>
  );
};

export default FeedOrderDetails;
