const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name

'this is a test'

const config = {
  logging: false
};

if(process.env.LOGGING === 'true'){
  delete config.logging
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if(process.env.DATABASE_URL){
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`, config)
module.exports = db


const sequelize = new Sequelize('graceshopper_pbq6', 'graceshopper_pbq6_user', '1p5nDUcVlsNA50HEOccXXqRJv6WjqcDy', {
  host: 'localhost',
  dialect: 'postgres'
}) 

module.exports = sequelize