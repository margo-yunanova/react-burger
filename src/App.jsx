import { useEffect, useState } from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import OrderDetails from './components/order-details/order-details';
import IngredientDetails from './components/ingredient-details/ingredient-details';


function App() {

  const domainAddress = 'https://norma.nomoreparties.space/api/ingredients';

  const [menu, setMenu] = useState({
    success: true,
    data: []
  });

  const [modal, setModal] = useState(false);

  useEffect(() => {

    fetch(domainAddress)
      .then(res => res.json())
      .then(obj => {
        setMenu({ ...menu, data: obj.data });
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
        <BurgerIngredients ingredients={ingredients} setModal={setModal} />
        {bun && <BurgerConstructor bun={bun} bunFilling={bunFilling} setModal={setModal} />}
      </div>
      {bun && <IngredientDetails bun={bun} visible={modal} setModal={setModal} />}
      <OrderDetails visible={modal} setModal={setModal} />
    </>
  );
}

export default App;
