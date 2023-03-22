import classNames from "classnames";
import { useSelector } from "react-redux";
import styles from "./ingredient-image-round-border.module.css";

const IngredientImageRoundBorder = ({ id, counter, index }) => {

  const ingredients = useSelector(
    (state) => state.ingredients.listBurgerIngredients.ingredients
  );

  const ingredient = ingredients.find(item => item._id === id)

  const styleIcon = classNames(styles.ingredientIcon, styles[`zIndex${index}`])

  const styleText = classNames("text text_type_main-default", styles.counter)

  return (
    <div className={styleIcon}>
      <img className={styles.image} src={ingredient?.image} alt={ingredient?.name} title={ingredient?.name}/>
      {counter > 0 && <div className={styles.shading} />}
      {counter > 0 && <p className={styleText}>+{counter}</p>}
    </div>
  );
};

export default IngredientImageRoundBorder;
