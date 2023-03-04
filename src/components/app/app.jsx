import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import { HIDE_ORDER_MODAL } from '../../services/actions/orderDetails';
import { HIDE_INGREDIENT_MODAL } from '../../services/actions/current-ingredient';
import Login from "../../pages/login";
import HomePage from '../../pages/home';
import RegisterPage from '../../pages/register';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import Profile from '../../pages/profile';

function App() {

  const dispatch = useDispatch();

  const orderDetailVisible = useSelector(state => state.orderDetails.orderDetailVisible);
  const currentIngredientVisible = useSelector(state => state.currentIngredient.currentIngredientVisible);

  useEffect(() => dispatch(getIngredients()), [dispatch]);

  return (
    <>
      <AppHeader />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<RegisterPage />}></Route>
          <Route path='/forgot-password' element={<ForgotPasswordPage />}></Route>
          <Route path='/reset-password' element={<ResetPasswordPage />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          {/*<Route path='/ingredients/:id' element={}></Route> */}
        </Routes>
      </BrowserRouter>



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
