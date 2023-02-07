import { useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import { HIDE_ORDER_MODAL } from '../../services/actions/orderDetails';
import { HIDE_INGREDIENT_MODAL } from '../../services/actions/current-ingredient';

function App() {

  const dispatch = useDispatch();

  const ingredients = useSelector(state => state.ingredients.listBurgerIngredients.ingredients);
  const orderDetailVisible = useSelector(state => state.orderDetails.orderDetailVisible);
  const currentIngredientVisible = useSelector(state => state.currentIngredient.currentIngredientVisible);

  useEffect(() => dispatch(getIngredients()), [dispatch]);

  return (
    <>
      <AppHeader />
      <main className={styles.menu}>
        <BurgerIngredients ingredients={ingredients} />
        {ingredients.length > 0 && <BurgerConstructor />}
      </main>

      {currentIngredientVisible &&
        <Modal close={() => dispatch({ type: HIDE_INGREDIENT_MODAL })} title='Детали ингридиента'>
          <IngredientDetails />
        </Modal>}
      {orderDetailVisible &&
        <Modal close={() => dispatch({ type: HIDE_ORDER_MODAL })}>
          <OrderDetails />
        </Modal>}
    </>
  );
}

export default App;
