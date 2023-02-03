import { useEffect, useState } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { IngredientsContext } from '../../services/ingredientsContext';
import { getIngredients } from "../../utils/burger-api";

function App() {

  const [menu, setMenu] = useState({
    success: true,
    data: []
  });

  const [orderDetailVisible, setOrderDetailVisible] = useState(false);
  const [orderDetails, setOrderDetails] = useState();
  const [currentIngredient, setCurrentIngredient] = useState();

  useEffect(() => {
    getIngredients()
      .then(obj => {
        setMenu((prev) => ({ ...prev, data: obj.data }));
      })
      .catch(e => console.log(e));
  }, []);

  const { data: ingredients } = menu;

  const bun = ingredients.findLast(item => item.type === 'bun');
  const bunFilling = ingredients.filter(item => item.type !== 'bun');

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
        <Modal close={() => setCurrentIngredient()} title='Детали ингридиента'>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>}
      {orderDetailVisible &&
        <Modal close={() => setOrderDetailVisible(false)}>
          <OrderDetails orderDetails={orderDetails} />
        </Modal>}
    </>
  );
}

export default App;
