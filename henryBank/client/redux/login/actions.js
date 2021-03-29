
import { LOGIN } from '../actions_types';
import axios from 'axios';
import { host } from '../varible_host';
import { useSelector } from 'react-redux';

export const login = (state) => (dispatch) => {
  axios.post(`http://${host}:8080/users/auth/login`, state).then((data) => {
    dispatch({ type: LOGIN, payload: data.data });
  });

};
