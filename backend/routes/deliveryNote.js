const router = require('express').Router();
let DeliveryNote = require('../models/deliveryNote.model');

router.route('/').get((req, res) => {
  DeliveryNote.find()
    .populate('company')
    .then((deliveryNote) => res.json(deliveryNote))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  DeliveryNote.findById(req.params.id)
    .then((deliveryNote) => res.json(deliveryNote))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const deliveryNoteId = req.body.deliveryNoteId;
  const date = req.body.date;
  const delivery = req.body.delivery;
  const newDeliveryNote = new DeliveryNote({
    deliveryNoteId,
    date,
    delivery,
  });

  newDeliveryNote
    .save()
    .then(() => res.json('delivery Plan added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
  DeliveryNote.findByIdAndDelete(req.params.id)
    .then(() => res.json('delivery Plan deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/edit/:id').post((req, res) => {
  console.log(req);

  DeliveryNote.findById(req.params.id)
    .then((deliveryNote) => {
      deliveryNote.deliveryNoteId = req.body.deliveryNoteId;
      deliveryNote.date = req.body.date;
      deliveryNote.delivery = req.body.delivery;
      // deliveryNote.code = req.body.code;
      // deliveryNote.quantity = req.body.quantity;

      deliveryNote
        .save()
        .then(() => res.json('delivery Note updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
