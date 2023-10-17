const { Booking } = require('../db');

function create(req, res, next) {
  const { date, member_id, copy_id } = req.body;

  Booking.create({
    date,
    member_id,
    copy_id
  })
    .then(booking => res.json(booking))
    .catch(err => res.status(400).json({ error: err.message }));
}

function list(req, res, next) {
  Booking.findAll()
    .then(bookings => res.json(bookings))
    .catch(err => res.status(400).json({ error: err.message }));
}

// Define otras funciones de controlador (index, replace, update, destroy) según tus necesidades.

module.exports = { create, list };
