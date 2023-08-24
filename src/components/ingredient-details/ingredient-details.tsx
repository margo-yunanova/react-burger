import { useParams } from 'react-router';
import styles from './ingredient-details.module.css';
import { FC } from 'react';
import { useAppSelector } from '../../utils/types';

const IngredientDetails: FC = () => {
  const { id } = useParams();

  const ingredients = useAppSelector(
    (state) => state.ingredients.ingredients,
  );

  const success = useAppSelector(
    (state) => state.ingredients.success,
  );
  const ingredient = ingredients.find((item) => item._id === id);

  if (!success) {
    return null;
  }

  return (
    <div className={styles.popup}>
      <div className={styles.details}>
        <img
          className={`pb-4 ${styles.image}`}
          src={ingredient?.image}
          alt={ingredient?.name}
        />
        <p className="text text_type_main-medium pb-8">{ingredient?.name}</p>
        <div className={`${styles.table} pb-15`}>
          <p className="text text_type_main-default">Калории,ккал</p>
          <p className="text text_type_digits-default">{ingredient?.calories}</p>
          <p className="text text_type_main-default">Белки, г</p>
          <p className="text text_type_digits-default">{ingredient?.proteins}</p>
          <p className="text text_type_main-default">Жиры, г</p>
          <p className="text text_type_digits-default">{ingredient?.fat}</p>
          <p className="text text_type_main-default">Углеводы, г</p>
          <p className="text text_type_digits-default">
            {ingredient?.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
}

export default IngredientDetails;
