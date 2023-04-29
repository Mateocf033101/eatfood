import { combineReducers } from "redux";
import GeneralReducer from "./GenerateReducer";

export default combineReducers({
  generalState: GeneralReducer,
});
