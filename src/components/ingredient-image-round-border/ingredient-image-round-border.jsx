import styles from "./ingredient-image-round-border.module.css";

const IngredientImageRoundBorder = ({ pinkBun }) => {
  return (
    <div className={styles.ingredientIcon}>
      <img className={styles.image} src={pinkBun.image} alt={pinkBun.name} />
    </div>
  );
};

export default IngredientImageRoundBorder;
