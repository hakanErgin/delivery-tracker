const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DeliveryNoteSchema = new Schema({
  deliveryNoteId: Number,
  date: Date,
  delivery: [{ code: String, quantity: Number, productionPlan: String }]
});

const DelieveryNote = mongoose.model('DelieveryNote', DeliveryNoteSchema);

module.exports = DelieveryNote;
