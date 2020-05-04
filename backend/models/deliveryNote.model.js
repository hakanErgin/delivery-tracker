const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DeliverySchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  code: String,
  quantity: Number,
  productionPlan: String,
});

const DeliveryNoteSchema = new Schema({
  deliveryNoteId: Number,
  date: Date,
  delivery: [DeliverySchema],
});

const DeliveryNote = mongoose.model('DeliveryNote', DeliveryNoteSchema);

module.exports = DeliveryNote;
