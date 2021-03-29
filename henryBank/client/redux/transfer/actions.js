import { TRANSFER } from "../actions_types";
import { host } from "../varible_host";
import axios from "axios";

export const menuTransfer = (cvu) => (dispatch) => {
  axios
    .get(`http://${host}:8080/users/transfer/list-transfer/${cvu}`)
    .then((data) => {
      dispatch({
        type: TRANSFER,
        payload: data.data,
      });
    });
};
