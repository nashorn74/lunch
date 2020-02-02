const mongoose = require('mongoose')

const personSchema = mongoose.Schema({
	name: String
})

personSchema.index({ name: 1 }, { unique: true })

const Person = mongoose.model('Person', personSchema)

module.exports = Person
