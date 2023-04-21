import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Feed from '../../pages/feed';
import OrderPlacedDetails from '../../pages/order-placed-details';
import ForgotPasswordPage from '../../pages/forgot-password';
import HomePage from '../../pages/home';
import Ingredient from '../../pages/ingredient';
import Login from '../../pages/login';
import Profile from '../../pages/profile';
import ProfileOrders from '../../pages/profile-orders';
import RegisterPage from '../../pages/register';
import ResetPasswordPage from '../../pages/reset-password';
import { getIngredients } from '../../services/actions/ingredients';
import { HIDE_ORDER_MODAL } from '../../services/actions/orderDetails';
import AppHeader from '../app-header/app-header';
import OrderPlaced from '../order-placed/order-placed';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import OrderList from '../order-list/order-list';
import OrderStats from '../order-stats/order--stats';
import ProfileForm from '../profile-form/profile-form';
import { ProtectedRouteElement } from '../protected-route-element/protected-route-element';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderDetailVisible = useSelector(
    (state) => state.orderDetails.orderDetailVisible,
  );

  useEffect(() => dispatch(getIngredients()), [dispatch]);

  const location = useLocation();
  const state = location.state;

  return (
    <>
      <AppHeader />
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route
          path="/profile"
          element={<ProtectedRouteElement element={<Profile />} />}
        >
          <Route index element={<ProfileForm />} />
          <Route path="orders" element={<ProfileOrders />} />
        </Route>
        <Route
          path="/profile/orders/:id"
          element={
            <ProtectedRouteElement
              element={
                <OrderPlaced isAllOrders={false}>
                  <OrderPlacedDetails />
                </OrderPlaced>
              }
            />
          }
        />
        <Route
          path="/ingredients/:id"
          element={
            <Ingredient title="Детали ингредиента">
              <IngredientDetails />
            </Ingredient>
          }
        />
        <Route
          path="/feed"
          element={
            <Feed>
              <OrderList />
              <OrderStats />
            </Feed>
          }
        />
        <Route
          path="/feed/:id"
          element={
            <OrderPlaced isAllOrders={true}>
              <OrderPlacedDetails />
            </OrderPlaced>
          }
        />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/feed/:id"
            element={
              <Modal close={() => navigate(-1)} title="">
                <OrderPlacedDetails />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:id"
            element={
              <Modal close={() => navigate(-1)} title="">
                <OrderPlacedDetails />
              </Modal>
            }
          />
          <Route
            path="/ingredients/:id"
            element={
              <Modal close={() => navigate(-1)} title="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}

      {orderDetailVisible && (
        <Modal close={() => dispatch({ type: HIDE_ORDER_MODAL })}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default App;
