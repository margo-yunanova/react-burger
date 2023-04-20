import styles from './ingredient.module.css';
import { FC } from 'react';

type TIngredient = {
  title?: string;
  children: React.ReactNode;
}

const Ingredient: FC<TIngredient> = ({ children, title }) => {
  return (
    <div className={styles.section}>
      <p className="text text_type_main-large">{title}</p>
      {children}
    </div>
  );
};

export default Ingredient;
