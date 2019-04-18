const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const personSchema = new Schema ( {
    name: {type: String},
    quotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Quote'}],
    personality: [{type: mongoose.Schema.Types.ObjectId, ref: 'Personality'}]
});
module.exports = mongoose.model('Person', personSchema);
