import { combineReducers } from "redux";
import { ingredients } from "./ingredients";
import { orderIngredients } from "./constructor";
import { orderDetails } from "./order-details";
import { user } from "./user";
import { wsReducer } from './webSocket'

const rootReducer = combineReducers({
  ingredients,
  orderDetails,
  orderIngredients,
  user,
  wsReducer,
});

export { rootReducer };
