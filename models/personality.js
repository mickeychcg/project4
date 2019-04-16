const mongoose = require ('mongoose');

const childSchema = new mongoose.Schema({
    trait_id: String,
    name: String,
    category: String,
    percentile: Number,
    raw_score: Number,
    significant: Boolean
})

const personality = new mongoose.Schema({
    trait_id: String,
    name: String,
    category: String,
    percentile: Number,
    raw_score: Number,
    significant: Boolean,
    children:[childSchema]
})


module.exports = mongoose.model('Personality', personality.Schema);