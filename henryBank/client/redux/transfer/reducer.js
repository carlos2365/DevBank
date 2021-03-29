import {TRANSFER} from '../actions_types';

const initialState = {
    dataTransfer: []
}

export default function transferReducer(state=initialState, action){
    switch(action.type){
        case TRANSFER:
        return {
            dataTransfer: action.payload
        }

        default:
            return state;
    }
}
