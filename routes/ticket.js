var Ticket = require('../models/ticket');

exports.success = function (req, res) {
  res.render('tickets_success', { title: 'Tickets' });
};

exports.index = function (req, res) {
  Ticket.find({}, function (err, data) {
    res.render('tickets_form', { title: 'Tickets', err: {}, tickets: data });
  });
};

exports.create = function (req, res) {
  var ticket = new Ticket(req.body);
  ticket.save(function (err) {
    if (!err) {
      res.redirect('/tickets/success');
    } else {
      res.locals.err = err;
      Ticket.find({}, function (err, data) {
        res.render('tickets_form', { title: 'Tickets', tickets: data })
      });
    }
  });
};

