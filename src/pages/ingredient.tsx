import styles from './ingredient.module.css';
import { FC, PropsWithChildren } from 'react';

type TIngredient = PropsWithChildren<{
  title?: string;
}>;

const Ingredient: FC<TIngredient> = ({ children, title }) => {
  return (
    <div className={styles.section}>
      <p className="text text_type_main-large">{title}</p>
      {children}
    </div>
  );
};

export default Ingredient;
