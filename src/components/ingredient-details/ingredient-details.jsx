import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import styles from './ingredient-details.module.css';

export default function IngredientDetails({ bun }) {
  return (
    <Modal>
      <div className={styles.popup}>
        <p className="text text_type_main-large pt-10 pl-10 pr-10">Детали ингридиента</p>
        <div className={styles.details}>
          <img className={`pb-4 ${styles.image}`} src={bun.image} alt={bun.name} />
          <p className="text text_type_main-medium pb-8">{bun.name}</p>
          <div className={styles.table}>
            <p className="text text_type_main-default">Калории,ккал</p>
            <p className="text text_type_digits-default">{bun.calories}</p>
            <p className="text text_type_main-default">Белки, г</p>
            <p className="text text_type_digits-default">{bun.proteins}</p>
            <p className="text text_type_main-default">Жиры, г</p>
            <p className="text text_type_digits-default">{bun.fat}</p>
            <p className="text text_type_main-default">Углеводы, г</p>
            <p className="text text_type_digits-default">{bun.carbohydrates}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

IngredientDetails.propTypes = {
  bun: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number
  })
}
