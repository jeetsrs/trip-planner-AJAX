
var express = require('express');
var router = express.Router();
var Place = require("../models").Place;
var Hotel = require("../models").Hotel;
var Restaurant = require("../models").Restaurant;
var Activity = require("../models").Activity;

router.get('/', (req, res, next) => {
  var allAttractions = {};
  console.log("Yaaa in the hotels");
  Hotel.findAll({
      include: [Place]
  })
  .then(function(hotels) {
    allAttractions.hotels = hotels;
    console.log(allAttractions.hotels);
    return Restaurant.findAll({
        include: [Place]
    });
  })
  .then(function(restaurants) {
    allAttractions.restaurants = restaurants;
    return Activity.findAll({
        include: [Place]
    });
  })
  .then(function(activities) {
    allAttractions.activities = activities;
    //console.log('completed loading', allAttractions.dataValues);
    res.json(allAttractions);
  })
  .catch(next);
});


module.exports = router;

