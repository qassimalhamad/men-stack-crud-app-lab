const mongoose = require('mongoose')

const carScheme = new mongoose.Schema({
  name: { type: String, required: true },
  price: {type: Number, required: true},
//   available: {type: Boolean, required: true},
  image: String,
})

const Car = mongoose.model('Car', carScheme)
module.exports = Car;