import { LOGIN } from "../actions_types.js";
const initialState = {
  loginUser: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        // registerData: [...state.registerData, action.payload],
        loginUser: action.payload,
      };

    default:
      return state;
  }
}
