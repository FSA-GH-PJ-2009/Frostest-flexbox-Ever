'use strict'

const db = require('../server/db')
const {Product, User, Order} = require('../server/db/models')
const faker = require('faker')

const productMaker = () => ({
  name: `${faker.commerce.productName()} Noodles`,
  description: faker.commerce.productDescription(),
  inventory: Math.floor(Math.random() * 100),
  imageUrl: faker.image.food(),
  price: Number(faker.commerce.price())
})

const userMaker = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  imageUrl: faker.internet.avatar(),
  password: faker.internet.password(),
  isAdmin: false
})
const adminMaker = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  imageUrl: faker.internet.avatar(),
  password: faker.internet.password(),
  isAdmin: true
})
const orderMaker = () => ({
  quantity: Math.floor(Math.random() * 100),
  productId: Math.floor(Math.random() * 99) + 1,
  userId: Math.floor(Math.random() * 49) + 1
})

const seedProducts = []
const seedUsers = []
const seedOrder = []

const populateSeeds = () => {
  for (let i = 1; i < 101; i++) {
    seedProducts.push(productMaker())
  }
  for (let i = 1; i < 51; i++) {
    seedUsers.push(userMaker())
  }
  for (let i = 1; i < 51; i++) {
    seedOrder.push(orderMaker())
  }
  seedUsers.push(adminMaker())
}

populateSeeds()

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  await Promise.all(seedProducts.map(product => Product.create(product)))
  await Promise.all(seedUsers.map(user => User.create(user)))
  await Promise.all(seedOrder.map(order => Order.create(order)))
  console.log('Database successfully seeded 🍜')
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
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

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
