'use strict'

const db = require('../server/db')
const {Product, User, Pending, Order} = require('../server/db/models')
const faker = require('faker')

const actualProducts = [
  {
    name: "MONK'S TAKE ON UDON",
    price: 12,
    inventory: 500,
    description:
      'Chicken, Udon noodles, fresno peppers, green onion, mushrooms, fresh basil',
    imageUrl:
      'https://www.pfchangs.com/images/default-source/menu/tokyo-udon-bowl.jpg?sfvrsn=c069fc35_4'
  },
  {
    name: 'PAD THAI. JONESY PAD THAI.',
    price: 11,
    inventory: 200,
    description:
      'Rice noodles, Thai spices, tofu, green onion, peanuts. Substitute with Shrimp or Add extra Peanuts',
    imageUrl:
      'https://www.pfchangs.com/images/default-source/menu/chicken-pad-thai.jpg?sfvrsn=a269fc35_4'
  },
  {
    name: 'SPICY MEETS SINGAPORE',
    price: 14,
    inventory: 230,
    description:
      'Thin rice noodles, light curry sauce, chicken, shrimp, onion, julienned vegetables',
    imageUrl:
      'https://www.pfchangs.com/images/default-source/menu/hokkien-street-noodles.jpg?sfvrsn=4668fc35_4'
  },
  {
    name: "LO MEIN AND EVERYTHING THAT'S RIGHT ABOUT IT",
    price: 12,
    inventory: 150,
    description:
      'Egg noodles, mushrooms, Asian vegetables, savory soy sauce. Protein options: Vegetable, Chicken, Beef, Pork, Shrimp',
    imageUrl:
      'https://www.pfchangs.com/images/default-source/menu/signature-lo-mein.jpg?sfvrsn=5668fc35_4'
  },
  {
    name: 'WOK AND ALL',
    price: 10,
    inventory: 190,
    description:
      'Wok-tossed with egg, carrots, bean sprouts, green onion. Protein options: Vegetable, Chicken, Beef, Pork, Shrimp',
    imageUrl:
      'https://paleoglutenfree.com/wp-content/uploads/2017/07/whole30-asain-noodle-bowl-1-900x642.jpg'
  },
  {
    name: 'RAMEN WITH A KICK',
    price: 16,
    inventory: 400,
    description:
      'Spicy miso broth, shiitakes, carrots, togarashi bean sprouts, green onion',
    imageUrl:
      'https://www.pfchangs.com/images/default-source/default-album/spicy-miso-ramen.jpg?sfvrsn=46c2f835_4'
  },
  {
    name: 'JUST WHAT NOODLE ORDERED',
    price: 15,
    inventory: 500,
    description:
      'Creamy tonkotsu pork broth, shiitakes, carrots, togarashi bean sprouts, green onion',
    imageUrl:
      'https://www.pfchangs.com/images/default-source/default-album/tonkotsu-ramen.jpg?sfvrsn=5ec2f835_2'
  },
  {
    name: 'ZUCCINI AND CHILL(ed tofu)',
    price: 11,
    inventory: 200,
    description:
      'Zuccini noodles, marinated tofu, fresno peppers, green onion, mushrooms, fresh basil',
    imageUrl:
      'https://foodwithfeeling.com/wp-content/uploads/2016/02/Zucchini-Noodle-Ramen-Soup-6.jpg'
  },
  {
    name: 'SESAME MUCHO',
    price: 13,
    inventory: 500,
    description: 'Sesame seed sauce, fried noodles, green onion and mushrooms',
    imageUrl:
      'https://www.jocooks.com/wp-content/uploads/2020/04/sesame-noodles-1-11.jpg'
  },
  {
    name: 'WHAT WE MEAN BY ROASTED',
    price: 14,
    inventory: 400,
    description:
      "Every noodle house has it's take on roasted veg and noodle. Well, this is ours.",
    imageUrl:
      'https://familystylefood.com/wp-content/uploads/2020/09/udon-ratatouille-500x375.jpg'
  }
]

const productMaker = () => ({
  name: `${faker.hacker.adjective()} noodles`,
  description: faker.commerce.productDescription(),
  inventory: Math.floor(Math.random() * 100),
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
const pendingMaker = products => {
  const productId = Math.floor(Math.random() * 99) + 1
  return {
    quantity: Math.floor(Math.random() * 100),
    orderPrice: products[productId - 1].price,
    productId,
    orderId: Math.floor(Math.random() * 49) + 1
  }
}
const orderMaker = () => ({
  orderDate: Math.random() * 2 > 1 ? null : faker.date.recent(),
  userId: Math.floor(Math.random() * 50) + 1
})

const seedProducts = []
const seedUsers = []
const seedPending = []
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
  for (let i = 1; i < 51; i++) {
    seedPending.push(pendingMaker(seedProducts))
  }
  seedUsers.push(adminMaker())
}

populateSeeds()

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  await Promise.all(actualProducts.map(product => Product.create(product)))
  await Promise.all(seedProducts.map(product => Product.create(product)))
  await Promise.all(seedUsers.map(user => User.create(user)))
  await Promise.all(seedOrder.map(order => Order.create(order)))
  await Promise.all(seedPending.map(pending => Pending.create(pending)))
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
