import { combineReducers } from "redux";
import login from "./login/reducer";
import user from "./user/reducer"; 
import transfer from "./transfer/reducer";
import divisaReducer from "./divisa"

const rootReducer = combineReducers({
  login,
  user,
  transfer,
  cambio: divisaReducer 
});

export default rootReducer;
