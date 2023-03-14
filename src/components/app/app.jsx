import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import { HIDE_ORDER_MODAL } from "../../services/actions/orderDetails";
import Login from "../../pages/login";
import HomePage from "../../pages/home";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";
import Profile from "../../pages/profile";
import { ProtectedRouteElement } from "../protected-route-element/protected-route-element";
import ProfileOrders from "../../pages/profile-orders";
import Ingredient from "../../pages/ingredient";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderDetailVisible = useSelector(
    (state) => state.orderDetails.orderDetailVisible
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
          <Route
            path="/profile/orders"
            element={<ProtectedRouteElement element={<ProfileOrders />} />}
          />
          <Route
            path="/profile/orders:id"
            element={<ProtectedRouteElement element={<Profile />} />}
          />
        </Route>
        <Route
          path="/ingredients/:id"
          element={
            <Ingredient
              title="Детали ингредиента"
            >
              <IngredientDetails />
            </Ingredient>}
        />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal
                close={() => navigate(-1)}
                title="Детали ингредиента"
              >
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
