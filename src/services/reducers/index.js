import { combineReducers } from "redux";
import { ingredients } from "./ingredients";
import { draggedIngredients } from "./constructor";
import { orderDetails } from "./order-details";
import { currentIngredient } from "./current-ingredient";

const rootReducer = combineReducers({
  ingredients,
  orderDetails,
  currentIngredient,
  draggedIngredients,
});

export { rootReducer };
