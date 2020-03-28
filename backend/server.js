const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const companyRouter = require('./routes/companies');
const productionPlanRouter = require('./routes/productionPlan');

app.use('/companies', companyRouter);
app.use('/production-plan', productionPlanRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
