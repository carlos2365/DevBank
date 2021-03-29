const {User, Account} = require('../database/db');
const {Op} = require('sequelize');

module.exports = {

    createUser(user) {
        return User.findOne({
            where: {
                email: user.email
            }
        })
        .then((value) => {
            if(value){
                return false
            }
            return User.create(user)
        })
    },

    updateInfo(user, info){
        return User.update(
            {
                ...user,
                ...info
            },
            {
                where: {id: user.id}
            }
        )
    },

    getOneUser(userId){
        return User.findOne({
            where: {
                id: userId
            }
        })
    },

    getUsers(){
        return User.findAll({
            include:{
                model: Account
            }
        })
    },

    
}