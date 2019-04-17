const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const personSchema = new Schema ( {
    name: {type: String},
    quotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Quote'}]
});
module.exports = mongoose.model('Person', personSchema);
