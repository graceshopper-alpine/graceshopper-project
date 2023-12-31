const Sequelize = require("sequelize");
const db = require("../db");

const OrderItem = db.define("order_item", {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
});

module.exports = OrderItem;
