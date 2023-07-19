//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Product = require ('./models/Product')
const Order = require('./models/Order')
const Session = require('./models/Session')
const OrderItem = require('./models/OrderItem')

//associations could go here!
Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Session.belongsTo(User);
User.hasMany(Session);

Order.belongsTo(Session);
Session.hasMany(Order);

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    Session,
    OrderItem
  },
}
