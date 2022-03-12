const router = require('express').Router();
let Traveller = require('../models/traveller.model');

router.route('/').get((req, res) => {
    Traveller.find()
        .then(traveller => res.json(traveller))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const timeOfTicketPurchase = req.body.timeOfTicketPurchase;
    const estimatedArrivalDate = req.body.estimatedArrivalDate;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;

    const newTraveller = new Traveller({
        firstName,
        lastName,
        timeOfTicketPurchase,
        estimatedArrivalDate,
        email,
        phoneNumber,
    });

    newTraveller.save()
        .then(() => res.json('Traveller added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/bulkAdd').post((req, res) => {
    if (!req.body.travellers || !Array.isArray(req.body.travellers)) {
        res.status(400).json('Error: travellers not array')
    }

    const travellers = req.body.travellers;
    const newTraveller = new Traveller();

    newTraveller.collection.insertMany(travellers)
        .then(() => res.json('Travellers added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/occupiedSeats').get((req, res) => {
    Traveller.find()
        .then(docs => {
            // for the map function, it will iterate the array [] and return the new item to form and store into a new array i.e. occupiedSeats
            const occupiedSeats = docs.map(doc => {
                return doc._doc.seatNumber
            })
            res.json({ occupiedSeats })
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/reservations').get((req, res) => {
    Traveller.find()
        .then(docs => {
            const reservations = docs
            res.json({ reservations })
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/reservation/:id').delete((req, res) => {
    Traveller.findByIdAndDelete(req.params.id)
        .then(() => res.json('Reservation deleted.'))
        .catch(err => res.status(400).json("Error:" + err));
});


// router.route('/:id').get((req, res) => {
//     Traveller.findById(req.params.id)
//         .then(traveller => res.json(traveller))
//         .catch(err => res.status(400).json('Error: ' + err));
// });
// router.route('/:id').delete((req, res) => {
//     Traveller.findByIdAndDelete(req.params.id)
//         .then(() => res.json('Traveller deleted.'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });
// router.route('/update/:id').post((req, res) => {
//     Traveller.findById(req.params.id)
//         .then(traveller => {
//             // traveller.firstName = req.body.firstName;
//             // traveller.lastName = req.body.lastName;

//             // traveller.timeOfTicketPurchase = Date.parse(req.body.timeOfTicketPurchase);
//             // traveller.estimatedArrivalDate = Date.parse(req.body.estimatedArrivalDate);
//             // traveller.email = req.body.email;
//             // traveller.phoneNumber = req.body.phoneNumber;

//             // traveller.save()
//             // .then(() => res.json('Traveller updated!'))
//             // .catch(err => res.status(400).json('Error: ' + err));
//             return
//         })
//         .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;