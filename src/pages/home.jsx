import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import styles from "../components/app/app.module.css";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import { ADD_INGREDIENT_INTO_CONSTRUCTOR } from "../services/actions/constructor";

const HomePage = () => {
  const ingredients = useSelector(
    (state) => state.ingredients.listBurgerIngredients.ingredients
  );
  const dispatch = useDispatch();

  const handleDrop = (ingredient) => {
    dispatch({
      type: ADD_INGREDIENT_INTO_CONSTRUCTOR,
      payload: {
        ingredient,
        code: uuidv4(),
      },
    });
  };

  return (
    <main className={styles.menu}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients ingredients={ingredients} />
        {ingredients.length > 0 && (
          <BurgerConstructor onDropHandler={handleDrop} />
        )}
      </DndProvider>
    </main>
  );
};

export default HomePage;
