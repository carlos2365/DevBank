import {GET_ONE_USER} from '../constants/api'
import axios from 'axios'

export const oneUser = async (userId) => {
    try{
        const user = await axios.get(`${GET_ONE_USER}/${userId}`)
        return user
    }
    catch(err){
        console.log(err)
    }
}

