import {CHANGE_CURRENT, RETURN_CURRENT, REMOVE_CURRENT} from './action_types'


export const changeCurrent = () => {
    return {
        type: CHANGE_CURRENT
    }
}

export const returnCurrent = () => {
    return {
        type: RETURN_CURRENT
    }
}

export const removeCurrent = () => {
    return {
        type: REMOVE_CURRENT
    }
}


