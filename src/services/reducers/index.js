import { combineReducers } from "redux";
import { ingredients } from "./ingredients";
import { burgerConstructor } from "./constructor";
import { orderDetails } from "./order-details";

const rootReducer = combineReducers({
  ingredients,
  burgerConstructor,
  orderDetails,
});

export { rootReducer };
