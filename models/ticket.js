var mongoose = require('mongoose');

var TicketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true }
});

TicketSchema.path('body').validate(function (field) {
  return field.length > 10;
}, 'Invalid description');

module.exports = mongoose.model('Ticket', TicketSchema);