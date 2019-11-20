const express = require('express')
const router = express.Router()
const Parks = require('../models/park.model');

router.get("/new", (req, res) => res.render("parks/new-park"))
router.post("/new", (req, res) => {
    Parks.create({
        name: req.body.name,
        description: req.body.description,
        active: true,
    }).then(park => res.json(park))
})

module.exports = router