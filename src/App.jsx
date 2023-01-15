import { useEffect, useState } from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import OrderDetails from './components/order-details/order-details';
import IngredientDetails from './components/ingredient-details/ingredient-details';


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
      <div className='menu'>
        <BurgerIngredients ingredients={ingredients} setCurrentIngredient={setCurrentIngredient} />
        {bun && <BurgerConstructor bun={bun} bunFilling={bunFilling} setVisible={setOrderDetailVisible} />}
      </div>

        {currentIngredient && <IngredientDetails ingredient={currentIngredient} setVisible={() => setCurrentIngredient(undefined)}/>}
        {orderDetailVisible && <OrderDetails visible={orderDetailVisible} setVisible={setOrderDetailVisible} />}
    </>
  );
}

export default App;
