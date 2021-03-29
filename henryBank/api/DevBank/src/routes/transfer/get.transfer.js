const server = require("express").Router();
const { Op } = require("sequelize");
const { User, Account, Transfer } = require("../../database/db");


server.get('/list-transfer/:cvu',async (req,res)=>{
    const {cvu, type } = req.params
    await Transfer.findAll({
        limit: 10,
        where: {
            [Op.or]: [
                { origin: cvu },
                { destination: cvu }
            ]
         } 
    })
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.json({msg:"no has hecho ninguna transferencia"})
    })
})

module.exports = server;
