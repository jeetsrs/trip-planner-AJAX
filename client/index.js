const mapboxgl = require('mapbox-gl');
const buildMarker = require('./marker');

/*
 * Instantiate the Map
 */

mapboxgl.accessToken = 'pk.eyJ1IjoiamVldHNycyIsImEiOiJjajY4M3FpM2swYnhrMzRyMGt1dGRmM2g4In0.uVm4cxhoLxloxzDxSTPeNg';
const map = new mapboxgl.Map({
  container: 'map-canvas',
  center: [-74.0, 40.731],
  zoom: 12.5, // starting zoom
  pitch: 35,
  bearing: 20,
  style: 'mapbox://styles/mapbox/streets-v10'
});


var markerFactory = function(name){

  console.log();
}

var hotelsData = function (hotels) {
  var hotelsMenu = document.getElementById('hotels-choices');
  hotels.forEach((hotel) => {
    var option = document.createElement('option');
    // should the value be the coordinates?? If it's coordinates, we can pass it to markerfactory
    option.value = hotel.name;
    option.text = hotel.name;
    hotelsMenu.append(option);
  });

  var hotelButton = document.getElementById('hotels-add').addEventListener('click', (event) => {
   // FIX MARKER CODE! - PASS THE TYPE AND THE COORDINATES

    var selectedHotel = document.getElementById('hotels-choices').value;
    markerFactory(selectedHotel);

    var listHotel = document.createElement("li");
    listHotel.append(selectedHotel);
    document.getElementById("hotels-list").append(listHotel);

    var removeButton = document.createElement('button');
    removeButton.className = 'btn btn-danger btn circle pull-right'
    removeButton.append('x');
    listHotel.append(removeButton);
    removeButton.addEventListener('click', (event) => {
      listHotel.remove();
      // remove marker here
    });
  });
};

var restaurantsData = function (restaurants) {
  var restaurantsMenu = document.getElementById('restaurants-choices');
  restaurants.forEach((restaurant) => {
    var option = document.createElement('option');
    option.value = restaurant.name;
    option.text = restaurant.name;
    restaurantsMenu.append(option);
  });

  var restaurantButton = document.getElementById('restaurants-add').addEventListener('click', (event) => {
    // Add shit here
    // Add marker code here
    var selectedRestaurants = document.getElementById('restaurants-choices').value;
    var listRestaurants = document.createElement("li");
    listRestaurants.append(selectedRestaurants);
    document.getElementById("restaurants-list").append(listRestaurants);

    var removeButton = document.createElement('button');
    removeButton.className = 'btn btn-danger btn circle pull-right'
    removeButton.append('x');
    listRestaurants.append(removeButton);
    removeButton.addEventListener('click', (event) => {
      listRestaurants.remove();
      // remove marker here
    });
  });
};

var activitiesData = function (activities) {
  var activitiesMenu = document.getElementById('activities-choices');
  activities.forEach((activity) => {
    var option = document.createElement('option');
    option.value = activity.name;
    option.text = activity.name;
    activitiesMenu.append(option);
  });

  var activitiesButton = document.getElementById('activities-add').addEventListener('click', (event) => {
    // Add shit here
    // Add marker code here
    var selectedActivity = document.getElementById('activities-choices').value;
    var listActivities = document.createElement("li");
    listActivities.append(selectedActivity);
    document.getElementById("activities-list").append(listActivities);

    var removeButton = document.createElement('button');
    removeButton.className = 'btn btn-danger btn circle pull-right'
    removeButton.append('x');
    listActivities.append(removeButton);
    removeButton.addEventListener('click', (event) => {
      listActivities.remove();
      // remove marker here
    });
  });
};


document.addEventListener('DOMContentLoaded', function (event) {
  console.log('loaded');
  fetch('/api')
    .then((result) => result.json())
    .then((data) => {
      var {
        hotels,
        activities,
        restaurants
      } = data;

      hotelsData(hotels);
      restaurantsData(restaurants);
      activitiesData(activities);
    })
    .catch(console.error);
});
