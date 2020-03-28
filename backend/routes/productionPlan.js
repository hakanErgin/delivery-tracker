const router = require('express').Router();
let ProductionPlan = require('../models/productionPlan.model');

router.route('/').get((req, res) => {
  ProductionPlan.find()
    .then(productionPlan => res.json(productionPlan))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const productionPlanId = req.body.productionPlanId;
  const company = req.body.company;

  const codes = req.body.codes;
  const date = req.body.date;
  const newProductionPlan = new ProductionPlan({
    productionPlanId,
    company,
    codes,
    date
  });

  newProductionPlan
    .save()
    .then(() => res.json('Production Plan added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
  ProductionPlan.findByIdAndDelete(req.params.id)
    .then(() => res.json('Production Plan deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
