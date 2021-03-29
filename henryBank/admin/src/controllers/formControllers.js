import {POST_FORM} from '../constants/api';
import axios from 'axios'

export const postForm = async (userId, info) => {
    try {
        const res = await axios.post(`${POST_FORM}/${userId}`, info)
        console.log(res)
    } catch(err){
        console.log({msg: err})
    }
}
