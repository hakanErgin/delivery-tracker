const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DeliverySchema = new Schema({
  company: String,
  code: String,
  quantity: Number,
  productionPlan: String
});

const DeliveryNoteSchema = new Schema({
  deliveryNoteId: Number,
  date: Date,
  delivery: [DeliverySchema]
});

const DelieveryNote = mongoose.model('DelieveryNote', DeliveryNoteSchema);

module.exports = DelieveryNote;