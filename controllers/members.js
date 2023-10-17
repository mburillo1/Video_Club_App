const { Member } = require('../db');

function create(req, res, next) {
  const { name, last_name, address, phone, status } = req.body;

  Member.create({
    name,
    last_name,
    address,
    phone,
    status
  })
    .then(member => res.json(member))
    .catch(err => res.status(400).json({ error: err.message }));
}

function list(req, res, next) {
  Member.findAll()
    .then(members => res.json(members))
    .catch(err => res.status(400).json({ error: err.message }));
}

// Define otras funciones de controlador (index, replace, update, destroy) según tus necesidades.

module.exports = { create, list };
