const mongoose = require ('mongoose');

const childSchema = new mongoose.Schema({
    name: String,
    raw_score: Number
})

const personalitySchema = new mongoose.Schema({
    name: String,
    raw_score: Number,
    children:[childSchema],
    needs:[childSchema]
})


module.exports = mongoose.model('Personality', personalitySchema);