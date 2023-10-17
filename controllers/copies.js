const { Copy } = require('../db');

function create(req, res, next) {
  const { number, format, movie_id, status } = req.body;

  Copy.create({
    number,
    format,
    movie_id,
    status
  })
    .then(copy => res.json(copy))
    .catch(err => res.status(400).json({ error: err.message }));
}

function list(req, res, next) {
  Copy.findAll()
    .then(copies => res.json(copies))
    .catch(err => res.status(400).json({ error: err.message }));
}

// Define otras funciones de controlador (index, replace, update, destroy) según tus necesidades.

module.exports = { create, list };
