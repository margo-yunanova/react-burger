import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from '../components/app/app.module.css';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import { FC } from 'react';
import { useAppSelector } from '../utils/types';

const HomePage: FC = () => {
  const ingredients = useAppSelector(
    (state) => state.ingredients.ingredients,
  );

  return (
    <main className={styles.menu}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        {ingredients.length > 0 && <BurgerConstructor />}
      </DndProvider>
    </main>
  );
};

export default HomePage;
