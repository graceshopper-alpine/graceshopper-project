'use strict'

const {db, models: {User,Product,Order,Session,OrderItem} } = require('../server/db')
const products = require('./seedData/products')
const users = require('./seedData/users')
const sessions = require('./seedData/sessions')
const orderItems = require('./seedData/order_items')
const orders = require('./seedData/orders')



/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  await User.bulkCreate(users);

  // Creating Products
  await Product.bulkCreate(products);

  // Creating Sessions
  await Session.bulkCreate(sessions);

  // Creating Orders
  await Order.bulkCreate(orders);

  // Creating Order Items
  await OrderItem.bulkCreate(orderItems);



  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

