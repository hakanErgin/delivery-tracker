const router = require('express').Router();
let ProductionPlan = require('../models/productionPlan.model');

router.route('/').get((req, res) => {
  ProductionPlan.find()
    .then(productionPlan => res.json(productionPlan))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  ProductionPlan.findById(req.params.id)
    .then(productionPlan => res.json(productionPlan))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const productionPlanId = req.body.productionPlanId;
  const company = req.body.company;

  const code = req.body.code;
  const quantity = req.body.quantity;
  const date = req.body.date;
  const newProductionPlan = new ProductionPlan({
    productionPlanId,
    company,
    code,
    quantity,
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

router.route('/update/:id').post((req, res) => {
  ProductionPlan.findById(req.params.id)
    .then(productionPlan => {
      productionPlan.id = req.body.id;
      productionPlan.company = req.body.company;
      productionPlan.code = req.body.code;
      productionPlan.quantity = req.body.quantity;
      productionPlan.date = req.body.date;

      productionPlan
        .save()
        .then(() => res.json('Production Plan updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
