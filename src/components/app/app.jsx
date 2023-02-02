import { useEffect, useState } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { IngredientsContext } from '../../services/ingredientsContext';


function App() {

  const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';

  const [menu, setMenu] = useState({
    success: true,
    data: []
  });

  const [orderDetailVisible, setOrderDetailVisible] = useState(false);

  const [currentIngredient, setCurrentIngredient] = useState(undefined);

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
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
        <IngredientsContext.Provider value={{bun, bunFilling}}>
          {bun && <BurgerConstructor openOrderModal={() => setOrderDetailVisible(true)} />}
        </IngredientsContext.Provider>
      </main>

      {currentIngredient &&
        <Modal close={() => setCurrentIngredient(undefined)} title='Детали ингридиента'>
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
