import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';

export default function IngredientDetails({ ingredient }) {
  return (
    <div className={styles.popup}>
      <div className={styles.details}>
        <img className={`pb-4 ${styles.image}`} src={ingredient.image} alt={ingredient.name} />
        <p className="text text_type_main-medium pb-8">{ingredient.name}</p>
        <div className={`${styles.table} pb-15`}>
          <p className="text text_type_main-default">Калории,ккал</p>
          <p className="text text_type_digits-default">{ingredient.calories}</p>
          <p className="text text_type_main-default">Белки, г</p>
          <p className="text text_type_digits-default">{ingredient.proteins}</p>
          <p className="text text_type_main-default">Жиры, г</p>
          <p className="text text_type_digits-default">{ingredient.fat}</p>
          <p className="text text_type_main-default">Углеводы, г</p>
          <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired
  }).isRequired
};
