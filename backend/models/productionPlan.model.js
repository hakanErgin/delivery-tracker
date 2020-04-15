const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductionPlanSchema = new Schema({
  productionPlanId: Number,
  company: {
    type: String,
    required: true
  },
  code: String,
  originalQuantity: Number,
  quantityLeft: Number,
  date: Date
});

const ProductionPlan = mongoose.model('ProductionPlan', ProductionPlanSchema);

module.exports = ProductionPlan;
