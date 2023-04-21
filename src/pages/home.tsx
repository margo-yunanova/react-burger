import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import styles from '../components/app/app.module.css';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import { FC } from 'react';

const HomePage: FC = () => {
  const ingredients = useSelector(
    (state: any) => state.ingredients.listBurgerIngredients.ingredients,
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
