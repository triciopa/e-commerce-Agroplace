require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const subcategories = require('./data/subcategories');
const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

// Missing import: orderDetail, User, Review, Category

const {
  Brand,
  Category,
  Favorite,
  Location,
  Newsletter,
  Order,
  OrderDetail,
  PaymentMethod,
  Product,
  Promotion,
  Review,
  SubCategory,
  Type,
  UnitsOnLocation,
  User,
  Wishlist,
  Timeslots,
} = sequelize.models;
//console.log(sequelize.models)
// Aca vendrian las relaciones
//roduct.hasMany(Reviews);

User.hasMany(Order);
User.hasMany(Review);
User.hasOne(Favorite);
User.hasMany(Product); //MarketPlace functionality
User.hasMany(Wishlist);
User.belongsToMany(Newsletter, { through: 'user_newsletter' });
User.belongsToMany(PaymentMethod, { through: 'user_payment' });
User.hasMany(Location);
User.belongsToMany(Timeslots, { through: 'user_timeslot' });

PaymentMethod.hasMany(Order);
PaymentMethod.belongsToMany(User, { through: 'user_payment' });

Favorite.belongsTo(User);
Favorite.belongsToMany(Product, { through: 'favorite_product' });

Wishlist.belongsTo(User);
Wishlist.belongsToMany(Product, { through: 'wishlist_product' });

Review.belongsTo(User);
Review.belongsTo(Product); // Comment.belonfsTo(Comment)
Review.belongsTo(OrderDetail); // review es por compra

Product.belongsTo(User);
Product.hasMany(Review); // review es por compra,
Product.hasMany(OrderDetail);
Product.belongsToMany(Category, {
  through: 'product_category',
  timestamps: false,
});
Product.belongsToMany(SubCategory, { through: 'product_subcategory' });
Product.belongsToMany(Favorite, { through: 'favorite_product' });
Product.belongsToMany(Wishlist, { through: 'wishlist_product' });
Product.belongsToMany(Brand, { through: 'product_brand' });
Product.belongsToMany(Type, { through: 'product_type' });
Product.hasMany(UnitsOnLocation);
Product.belongsToMany(Promotion, { through: 'product_promotion' });

Location.belongsTo(User);
Location.hasMany(UnitsOnLocation);
Location.hasMany(Timeslots);

UnitsOnLocation.belongsTo(Location);
UnitsOnLocation.belongsTo(Product);

Order.hasMany(OrderDetail);
Order.belongsTo(User);
Order.belongsTo(PaymentMethod);

OrderDetail.belongsTo(Order);
OrderDetail.belongsTo(Product);
OrderDetail.hasOne(Review); //review es por compra

Category.hasMany(SubCategory);
Category.belongsToMany(Product, {
  through: 'product_category',
  timestamps: false,
});

SubCategory.belongsTo(Category);
SubCategory.belongsToMany(Product, { through: 'product_subcategory' });

Type.belongsToMany(Product, { through: 'product_type' });
Brand.belongsToMany(Product, { through: 'product_brand' });

Newsletter.belongsToMany(User, { through: 'user_newsletter' });

Promotion.belongsToMany(Product, { through: 'product_promotion' });

Timeslots.belongsToMany(User, { through: 'user_timeslot' });
Timeslots.belongsTo(Location);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
