import classNames from 'classnames';
import { useSelector } from 'react-redux';
import styles from './ingredient-image-round-border.module.css';
import { FC } from 'react';

type TIngredientImageRoundBorder = {
  id?: string; //.isRequired, TODO добавить когда яндекс пофиксит бэкэнд
  counter?: number;
  index?: number;
}

const IngredientImageRoundBorder: FC<TIngredientImageRoundBorder> = ({ id, counter = 0, index }) => {
  const ingredients = useSelector(
    (state: any) => state.ingredients.listBurgerIngredients.ingredients,
  );

  const ingredient = ingredients.find((item: any) => item._id === id);

  const styleIcon = classNames(styles.ingredientIcon, styles[`zIndex${index}`]);

  const styleText = classNames('text text_type_main-default', styles.counter);

  return (
    <div className={styleIcon} title={ingredient?.name}>
      <img
        className={styles.image}
        src={ingredient?.image}
        alt={ingredient?.name}
      />
      {counter > 0 && <div className={styles.shading} />}
      {counter > 0 && <p className={styleText}>+{counter}</p>}
    </div>
  );
};

export default IngredientImageRoundBorder;
