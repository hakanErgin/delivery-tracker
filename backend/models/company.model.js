const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
  id: { type: Number, required: true, unique: true },
  companyName: { type: String, required: true },
  codes: [String]
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
