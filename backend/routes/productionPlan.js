const router = require('express').Router();
let ProductionPlan = require('../models/productionPlan.model');

router.route('/').get((req, res) => {
  ProductionPlan.find()
    .populate('company')
    .then((productionPlan) => res.json(productionPlan))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/company/:companyId').get((req, res) => {
  console.log(req.params);

  ProductionPlan.find({ company: req.params.companyId })

    .then((productionPlans) => res.json(productionPlans))
    // .then((productionPlans) =>
    //   res.json(
    //     productionPlans.filter(
    //       (productionPlan) => productionPlan.company === req.params.company
    //     )
    //   )
    // )
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  ProductionPlan.findById(req.params.id)
    .then((productionPlan) => res.json(productionPlan))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const company = req.body.company;
  const productionPlanId = req.body.productionPlanId;
  const code = req.body.code;
  const originalQuantity = req.body.originalQuantity;
  const quantityLeft = req.body.quantityLeft;
  const date = req.body.date;
  const newProductionPlan = new ProductionPlan({
    productionPlanId,
    company,
    code,
    originalQuantity,
    quantityLeft,
    date,
  });

  newProductionPlan
    .save()
    .then(() => res.json('Production Plan added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
  ProductionPlan.findByIdAndDelete(req.params.id)
    .then(() => res.json('Production Plan deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  ProductionPlan.findById(req.params.id)
    .then((productionPlan) => {
      productionPlan.id = req.body.id;
      productionPlan.company = req.body.company;
      productionPlan.code = req.body.code;
      productionPlan.originalQuantity = req.body.originalQuantity;
      productionPlan.quantityLeft = req.body.quantityLeft;
      productionPlan.date = req.body.date;

      productionPlan
        .save()
        .then(() => res.json('Production Plan updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
