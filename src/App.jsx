import { useEffect, useState } from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import ModalOverlay from './components/modal-overlay/modal-overlay';


function App() {

  const domainAddress = 'https://norma.nomoreparties.space/api/ingredients';

  const [menu, setMenu] = useState({
    success: true,
    data: []
  });

  useEffect(() => {

    fetch(domainAddress)
      .then(res => res.json())
      .then(obj => {
        setMenu({ ...menu, data: obj.data });
      })
      .catch(e => console.log);
  }, []);

  const { data: ingredients } = menu;

  const bun = ingredients.findLast(item => item.type === 'bun');

  const bunFilling = ingredients.filter(item => item.type !== 'bun');

  return (
    <>
      <AppHeader />
      <div className='menu'>
        <BurgerIngredients ingredients={ingredients} />
        {bun && <BurgerConstructor bun={bun} bunFilling={bunFilling} />}
      </div>
      <ModalOverlay />
    </>
  );
}

export default App;
