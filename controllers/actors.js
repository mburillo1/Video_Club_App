const express = require('express');
const { Actor } = require('../db'); // Asegúrate de importar el modelo Actor desde tu base de datos

// Función para crear un actor
function create(req, res, next) {
  const name = req.body.name;
  const lastName = req.body.lastName;

  Actor.create({
    name: name,
    lastName: lastName
  })
    .then(actor => res.json(actor))
    .catch(err => res.send(err));
}

// Función para listar todos los actores
function list(req, res, next) {
  Actor.findAll()
    .then(actors => res.json(actors))
    .catch(err => res.send(err));
}

// Función para buscar un actor por ID
function index(req, res, next) {
  const id = req.params.id;
  Actor.findByPk(id)
    .then(actor => res.json(actor))
    .catch(err => res.send(err));
}

// Función para reemplazar un actor por ID
function replace(req, res, next) {
  const id = req.params.id;
  const name = req.body.name;
  const lastName = req.body.lastName;

  Actor.findByPk(id).then(actor => {
    actor.update({
      name: name,
      lastName: lastName
    })
      .then(updatedActor => res.json(updatedActor))
      .catch(err => res.send(err));
  }).catch(err => res.send(err));
}

// Función para actualizar un actor por ID
function update(req, res, next) {
  const id = req.params.id;
  const name = req.body.name;
  const lastName = req.body.lastName;

  Actor.findByPk(id).then(actor => {
    actor.update({
      name: name || actor.name,
      lastName: lastName || actor.lastName
    })
      .then(updatedActor => res.json(updatedActor))
      .catch(err => res.send(err));
  }).catch(err => res.send(err));
}

// Función para eliminar un actor por ID
function destroy(req, res, next) {
  const id = req.params.id;
  Actor.destroy({ where: { id: id } })
    .then(result => res.json({ message: 'Actor eliminado con éxito' }))
    .catch(err => res.send(err));
}

module.exports = { create, list, index, replace, update, destroy };
