const {User, UserInfo, Account} = require('../database/db');
const {Op} = require('sequelize');

module.exports = {

    // createdAccount(data){
    //     // Mandar userId en data
    //     return Account.create(data)
    // },

    newTransfer(data){
        const {destinationM, destination, value} = data
        Account.findOne({where : {destination: destinationM}})
        .then((response) => {
            console.log("AAAAAAAAAAAAA 1")
            console.log("AAAAAAAAAAAAA 1",response.dataValues.balance)
            console.log("AAAAAAAAAAAAA 1", value)
            if( response.dataValues.balance >= value){
                var cantidad = response.dataValues.balance - value
                Account.update({balance: cantidad}, {where: {destination: destinationM}})
                .then((responseA) => {
                    console.log("AAAAAAAAAAAAA 2")
                   return Account.findOne({where: {destination}})
                })
                .then((responseB) => {
                    console.log("AAAAAAAAAAAAA 3")
                    var cantidadRecive = responseB.dataValues.balance -1 + value + 1
                    return Account.update({balance: cantidadRecive}, {where: {destination}})
                })
                // .then((responseC) => {
                //     //crear modelo trasfer para registrar estas transferencias.
                //     res.send("transferencia realizada con exito")
                // })
                // .catch(err => {
                //     console.log("AAAAAAAAAAAAA ERR")
                //     console.log("HUBO ERROR EN LA TRANSACCION")
                //     return err
                // })
            }else {
                console.log("ENTRO AL ELSE")
            }
        })

    }
}