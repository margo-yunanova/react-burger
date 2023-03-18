import classNames from "classnames";
import styles from "./ingredient-image-round-border.module.css";

const IngredientImageRoundBorder = ({ pinkBun, num, counter }) => {

  const styleIcon = classNames(styles.ingredientIcon, styles[`zIndex${num}`])

  const styleText = classNames("text text_type_main-default", styles.counter)

  return (
    <div className={styleIcon}>
      <img className={styles.image} src={pinkBun.image} alt={pinkBun.name} />
      {counter > 0 && <div className={styles.shading} />}
      {counter > 0 && <p className={styleText}>+{counter}</p>}
    </div>
  );
};

export default IngredientImageRoundBorder;
