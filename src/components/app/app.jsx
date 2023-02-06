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
import { HIDE_ORDER_DETAILS } from '../../services/actions/orderDetails';

function App() {

  const dispatch = useDispatch();

  const ingredients = useSelector(state => state.ingredients.listBurgerIngredients.ingredients);
  const orderDetailVisible = useSelector(state => state.orderDetails.orderDetailVisible);

  const [currentIngredient, setCurrentIngredient] = useState(null);

  useEffect(() => dispatch(getIngredients()), [dispatch]);

  return (
    <>
      <AppHeader />
      <main className={styles.menu}>
        <BurgerIngredients ingredients={ingredients} setCurrentIngredient={setCurrentIngredient} />
        {ingredients.length > 0 && <BurgerConstructor />}
      </main>

      {currentIngredient &&
        <Modal close={() => setCurrentIngredient(null)} title='Детали ингридиента'>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>}
      {orderDetailVisible &&
        <Modal close={() => dispatch({ type: HIDE_ORDER_DETAILS })}>
          <OrderDetails />
        </Modal>}
    </>
  );
}

export default App;
