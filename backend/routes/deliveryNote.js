const router = require('express').Router();
let DeliveryNote = require('../models/deliveryNote.model');

router.route('/').get((req, res) => {
  DeliveryNote.find()
    .then(deliveryNote => res.json(deliveryNote))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  DeliveryNote.findById(req.params.id)
    .then(deliveryNote => res.json(deliveryNote))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const deliveryNoteId = req.body.deliveryNoteId;
  const company = req.body.company;

  const code = req.body.code;
  const quantity = req.body.quantity;
  const date = req.body.date;
  const newDeliveryNote = new DeliveryNote({
    deliveryNoteId,
    company,
    code,
    quantity,
    date
  });

  newDeliveryNote
    .save()
    .then(() => res.json('Production Plan added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
  DeliveryNote.findByIdAndDelete(req.params.id)
    .then(() => res.json('Production Plan deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  DeliveryNote.findById(req.params.id)
    .then(deliveryNote => {
      deliveryNote.id = req.body.id;
      deliveryNote.company = req.body.company;
      deliveryNote.code = req.body.code;
      deliveryNote.quantity = req.body.quantity;
      deliveryNote.date = req.body.date;

      deliveryNote
        .save()
        .then(() => res.json('Production Plan updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
