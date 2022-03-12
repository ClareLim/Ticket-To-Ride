const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const travellerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  lastName: {
    type: String,
    required: false,
    unique: false,
    trim: true,
  },
  timeOfTicketPurchase: {
    type: Date,
    required: false,
    unique: false,
    trim: true,
  },
  estimatedArrivalDate: {
    type: Date,
    required: false,
    unique: false,
    trim: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: false,
    unique: true,
    trim: true,
  },
}, {
  timestamps: true,
});

const Traveller = mongoose.model('Traveller', travellerSchema);

module.exports = Traveller;