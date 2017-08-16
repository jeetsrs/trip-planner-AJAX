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

const selectedItems = {};

var hotelsData = function (hotels) {
  var hotelsMenu = document.getElementById('hotels-choices');
  hotels.forEach((hotel) => {
    var option = document.createElement('option');
    option.value = hotel.name;
    option.text = hotel.name;
    hotelsMenu.append(option);
  });

  var hotelButton = document.getElementById('hotels-add').addEventListener('click', (event) => {
    var selectedHotel = document.getElementById('hotels-choices').value;

    for (var index = 0; index < hotels.length; index++) {
      if (hotels[index].name === document.getElementById('hotels-choices').value) {
        selectedItems[selectedHotel] = hotels[index].place.location;
      }
    }

    buildMarker('hotels', selectedItems[selectedHotel]).addTo(map);
    map.flyTo({
      center: selectedItems[selectedHotel]
    });

    var listHotel = document.createElement("li");
    listHotel.className = 'itinerary-item';
    document.getElementById("hotels-list").append(listHotel);

    var removeButton = document.createElement('button');
    removeButton.className = 'btn btn-xs btn-danger remove btn-circle';
    removeButton.append('x');
    listHotel.append(selectedHotel, removeButton);
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
    var selectedRestaurants = document.getElementById('restaurants-choices').value;

    for (var index = 0; index < restaurants.length; index++) {
      if (restaurants[index].name === document.getElementById('restaurants-choices').value) {
        selectedItems[selectedRestaurants] = restaurants[index].place.location;
      }
    }

    buildMarker('restaurants', selectedItems[selectedRestaurants]).addTo(map);
    map.flyTo({
      center: selectedItems[selectedRestaurants]
    });

    var listRestaurants = document.createElement("li");
    listRestaurants.className = 'itinerary-item';
    document.getElementById("restaurants-list").append(listRestaurants);

    var removeButton = document.createElement('button');
    removeButton.className = 'btn btn-xs btn-danger remove btn-circle';
    removeButton.append('x');
    // listRestaurants.append(removeButton);
    listRestaurants.append(selectedRestaurants, removeButton);
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
    var selectedActivity = document.getElementById('activities-choices').value;

    for (var index = 0; index < activities.length; index++) {
      if (activities[index].name === document.getElementById('activities-choices').value) {
        selectedItems[selectedActivity] = activities[index].place.location;
      }
    }

    buildMarker('activities', selectedItems[selectedActivity]).addTo(map);
    map.flyTo({
      center: selectedItems[selectedActivity]
    });

    var listActivities = document.createElement("li");
    listActivities.className = 'itinerary-item';
    document.getElementById("activities-list").append(listActivities);

    var removeButton = document.createElement('button');
    removeButton.className = 'btn btn-xs btn-danger remove btn-circle';
    removeButton.append('x');
    listActivities.append(selectedActivity, removeButton);
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
