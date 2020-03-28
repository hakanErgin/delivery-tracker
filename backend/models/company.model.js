const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
  companyName: { type: String, required: true, unique: true }
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
