   
const express = require('express');
const Plant = require('./plants-model');
const router = express.Router();
const { restricted } = require("../auth/auth-middleware");


router.get('/', restricted, (req, res, next) => {
    Plant.find()
    .then(plants => {
        res.json(plants)
    })
    .catch(next)
})

router.get('/:id', restricted, (req, res, next) => {
    Plant.findById(req.params.id)
    .then(plants => {
        res.json(plants)
    })
    .catch(next)
})


router.delete('/:plant_id', restricted, (req, res, next) =>{
    Plant.del(req.params.plant_id)
    .then(plant => {
        res.json(plant)
    })
    .catch(next)
})

module.exports = router;