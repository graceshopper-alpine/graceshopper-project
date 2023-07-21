const Sequelize = require('sequelize')
const db = require('../db')
const OrderItem = require('./OrderItem')

const Order = db.define('order', {
    status: {
        type: Sequelize.ENUM('cart','placed')
    },
    completedAt: {
        type: Sequelize.DATE
    },
    total: {
        type: Sequelize.STRING,
        defaultValue: "$0.00"
    }
})


module.exports = Order