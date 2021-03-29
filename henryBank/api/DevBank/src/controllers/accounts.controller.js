const { User, Account } = require('../database/db')
const { Op, json } = require('sequelize')


module.exports = {
    createdAccount(id) {
        let cvuPesos = Math.round((Math.random() + id) * ((900000000000) - (100000000000)) + (100000000000));
        let accountPesos = Math.round((Math.random() + id) * ((99999999) - (10000000)) + (10000000));
        let dataPesos = {
            userId: id,
            accountNumber: accountPesos,
            balance: 0,
            currency: 'PESOS',
            cvu: cvuPesos,
            type: 'CAJA DE AHORRO',
        };

        let cvuUsd = Math.round((Math.random() + id) * ((9000000000000) - (1000000000000)) + (1000000000000));
        let accountUsd = Math.round((Math.random() + id) * ((999999999) - (100000000)) + (100000000));
        let dataUsd = {
            userId: id,
            accountNumber: accountUsd,
            balance: 0,
            currency: 'USD',
            cvu: cvuUsd,
            type: 'CAJA DE AHORRO',
        };
        return Account.create(dataPesos)
            .then(() => {
                Account.create(dataUsd)
                return json({msg: 'Account created successfuly'})
            })
    },

    getAccount(id) {
        return Account.findOne({
            where: {
                userId: id
            }
        })
    }
}
