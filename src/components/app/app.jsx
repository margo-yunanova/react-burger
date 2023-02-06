import { useEffect, useState } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';

function App() {

  const dispatch = useDispatch();

  const ingredients = useSelector(state => state.ingredients.listBurgerIngredients.ingredients);
  const [currentIngredient, setCurrentIngredient] = useState(null);

  useEffect(() => dispatch(getIngredients()), [dispatch]);

  return (
    <>
      <AppHeader />
      <main className={styles.menu}>
        <BurgerIngredients ingredients={ingredients} setCurrentIngredient={setCurrentIngredient} />
        <IngredientsContext.Provider value={{ bun, bunFilling }}>
          {bun && <BurgerConstructor setOrderDetails={setOrderDetails} setOrderDetailVisible={setOrderDetailVisible} />}
        </IngredientsContext.Provider>
      </main>

      {currentIngredient &&
        <Modal close={() => setCurrentIngredient(null)} title='Детали ингридиента'>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>}
      {orderDetailVisible &&
        <Modal close={() => setOrderDetailVisible(false)}>
          <OrderDetails />
        </Modal>}
    </>
  );
}

export default App;
