let mongoose = require('mongoose');
 let express = require('express');
let router = express.Router();
const bankJs = require('../models/Bank');






router.get('/bank/:id', function (req, res) {

    bankJs.Bank.getById(req.params.id)
        .then(bank => {
           res.json(bank);
        })
        .catch(error => {
            res.status(500).json("we have some problems")
        });
})









module.exports = router;