import {CHANGE_CURRENT, REMOVE_CURRENT, RETURN_CURRENT} from '../actions/action_types'


const form_reducer = (state = 0, action) => {
    switch(action.type) {
        case CHANGE_CURRENT:
            return state += 1
        case RETURN_CURRENT:
            return state -= 1    
        case REMOVE_CURRENT:   
            return state = 0
        default:
            return state    
    }
}


export default form_reducer