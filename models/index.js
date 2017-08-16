var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/tripplaner');

const Hotel = db.define('hotel', {
  name: {type: Sequelize.STRING},
  num_stars: {type: Sequelize.INTEGER},
  amenities: {type: Sequelize.STRING}
});

const Restaurant = db.define('restaurant', {
  name: {type: Sequelize.STRING},
  price: {type: Sequelize.INTEGER},
  cuisine: {type: Sequelize.STRING}
});

const Activity = db.define('activity', {
  name: {type: Sequelize.STRING},
  age_range: {type: Sequelize.STRING}
});

const Place = db.define('place', {
  address: {type: Sequelize.STRING},
  city: {type: Sequelize.STRING},
  state: {type: Sequelize.STRING},
  phone: {type: Sequelize.STRING},
  location: {type: Sequelize.ARRAY (Sequelize.DECIMAL)}
});

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);



module.exports = {
  db,
  Hotel,
  Restaurant,
  Activity,
  Place
};

// create marker factory
// pass coordinates to markerFactory
// create marker
