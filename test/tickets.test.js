var should = require('should'),
  request = require('supertest'),
  mongoose = require('mongoose'),
  app = require('../app');

require('mongoose-mstub');

// Load models
var Ticket = require('../models/ticket');

describe('Suite', function () {
  describe('<Unit> Ticket Test', function () {
    it('should save a new valid ticket', function (done) {
      mstub(Ticket, 'save', function save_stub(callback) { callback(); });
      var ticket = new Ticket({ title: 'Testing new tickets', body: 'Pass the ticket test' });
      ticket.save(function (err) {
        should.not.exists(err); // assert is not returning err
        munstub(Ticket, 'save');
        done();
      });
    });
  });

  describe('<Functional> Tickets Test', function () {
    before(function (done) {
      Ticket.remove({}, done);
    });

    it('POST /tickets should return status 200', function (done) {
      request(app)
        .post('/tickets')
        .send({ title: 'Testing new ticket', body: 'Pass the ticket test' })
        .end(function (err, res) {
          res.should.have.status(302);
          res.text.should.equal('Moved Temporarily. Redirecting to /tickets/success');
          done();
        })
    })
  });
});