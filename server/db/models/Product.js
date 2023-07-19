const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image_url: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    },
    category: {
        type: Sequelize.STRING,
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
})

module.exports = Product