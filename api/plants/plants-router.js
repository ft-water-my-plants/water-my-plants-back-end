   
const express = require('express');
const Plant = require('./plants-model');
const router = express.Router();
const { restricted } = require("../auth/auth-middleware");


router.get('/', (req, res, next) => {
    Plant.find()
    .then(plants=>{
        res.json(plants)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
    Plant.findById(req.params.id)
    .then(plants=>{
        res.json(plants)
    })
    .catch(next)
})


router.delete('/:plant_id', (req,res,next) =>{
    Plant.del(req.params.plant_id)
    .then(obj=>{
        res.json(obj)
    })
    .catch(next)
})

module.exports = router;