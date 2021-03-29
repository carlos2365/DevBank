import {
  SAVE_REGISTER_DATA,
  ACCOUNT_LOGIN,
  EMPTY_REDUX,
  UPDATE_USER_PIC,
} from "../actions_types";
import axios from "axios";
import { host } from "../varible_host";
import { useSelector } from "react-redux";

export const saveRegisterData = (data, finish) => (dispatch) => {
  if (finish == 0) {
    axios.post(`http://${host}:8080/users`, data);
    dispatch({ type: SAVE_REGISTER_DATA, payload: data });
  } else {
    dispatch({ type: SAVE_REGISTER_DATA, payload: data });
  }
};

export const accountUser = (id, currency) => (dispatch) => {
  axios
    .get(`http://${host}:8080/users/account/${id}/${currency}`)
    .then((data) => {
      dispatch({ type: ACCOUNT_LOGIN, payload: data.data });
    });
};

export const updateUserPic = (uri) => (dispatch) => {
  dispatch({
    type: UPDATE_USER_PIC,
    payload: uri,
  });
};

export const recargarDinero = (cvu, currency, value) => () => {
  var datos = {
    cvu,
    currency,
    value,
  };

  axios.post(`http://${host}t:8080/users/transfer/deposito`, datos);
};

export const vaciarReducer = () => (dispatch) => {
  var data = "";
  dispatch({ type: EMPTY_REDUX, payload: data });
};
