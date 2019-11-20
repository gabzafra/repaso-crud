const express = require('express')
const router = express.Router()
const Parks = require('../models/park.model');
const Coasters = require('../models/coaster.model');

router.get("/new", (req, res) => {
    Parks.find().then(parks => res.render("coasters/new-coaster",{parks}))
})

router.post("/new", (req, res) => {
    Coasters.create({
        name: req.body.name,
        description: req.body.description,
        inversions: +req.body.inversions,
        length: +req.body.length,
        active: true,
        park: req.body.park
    }).then(coaster => res.json(coaster))
})

router.get("/", (req, res) => Coasters.find().then(coasters => {
    
       Coasters
        .find()
        .populate("park")
        .then(coasters => {
            res.render("coasters/coasters-index",{coasters})
        });

        
    
}));

router.get("/:id", (req, res) => {
    Coasters
        .findById(req.params.id)
        .populate("park")
        .then(coaster => {
            res.render("coasters/coaster-details",coaster)
        });
})

router.get("/delete/", (req, res) => {
    console.log(req.query)
})

router.get("/edit", (req, res) => res.render("coasters/coaster-details"))

router.put("/:id", (req, res) => res.render("coasters/new-coaster"))


module.exports = router