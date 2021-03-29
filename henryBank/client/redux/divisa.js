import axios from "axios";

//Ducks:

//constates
const dataInicial = {
    array: []
}

const OBTENER_CAMBIO_DIVISA = 'OBTENER_CAMBIO_DIVISA'

//reducer

export default function divisaReducer(state = dataInicial, action){
    switch(action.type) {
        case OBTENER_CAMBIO_DIVISA:
            return {...state, array: action.payload}
        default:
            return state 

    }
}

//acciones
export const obtenerDivisaAccion = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(`http://${host}:3000/api/divisa`)
        dispatch({
            type: OBTENER_CAMBIO_DIVISA,
            payload: res.data
        })
        
    } catch (error) {
        console.log(error)
        
    }

}