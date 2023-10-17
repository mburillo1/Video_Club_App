const express = require('express'); 
const { Movie, Genre, Director, Actor } = require('../db'); 


function create(req, res, next) {
  const title = req.body.title;
  const genreId = req.body.genreId;
  const directorId = req.body.directorId;

  Movie.create({
    title: title,
    genreId: genreId,
    directorId: directorId
  })
    .then(movie => res.json(movie))
    .catch(err => res.send(err));
}

function list(req, res, next) {
  Movie.findAll({
    include: [Genre, Director, Actor]
  })
    .then(objects => res.json(objects))
    .catch(err => res.send(err));
}

function addActor(req, res, next) {
  const idMovie = req.body.idMovie;
  const idActor = req.body.idActor;

  Movie.findByPk(idMovie).then(movie => {
    Actor.findByPk(idActor).then(actor => {
      movie.addActor(actor)
        .then(() => res.json(movie))
        .catch(err => res.send(err));
    }).catch(err => res.send(err));
  }).catch(err => res.send(err));
}

function index(req, res, next) {
  const id = req.params.id; // Supon que el parámetro :id está en la URL

  Movie.findByPk(id, {
    include: [Genre, Director, Actor]
  })
    .then(movie => {
      if (!movie) {
        return res.status(404).json({ error: 'Película no encontrada' });
      }
      res.json(movie);
    })
    .catch(err => res.send(err));
}

function replace(req, res, next) {
  const id = req.params.id; // Supon que el parámetro :id está en la URL

  Movie.findByPk(id)
    .then(movie => {
      if (!movie) {
        return res.status(404).json({ error: 'Película no encontrada' });
      }

      const { title, genreId, directorId } = req.body;

      movie.title = title;
      movie.genreId = genreId;
      movie.directorId = directorId;

      movie
        .save()
        .then(() => res.json(movie))
        .catch(err => res.send(err));
    })
    .catch(err => res.send(err));
}

function update(req, res, next) {
  const id = req.params.id; // Supon que el parámetro :id está en la URL

  Movie.findByPk(id)
    .then(movie => {
      if (!movie) {
        return res.status(404).json({ error: 'Película no encontrada' });
      }

      const { title, genreId, directorId } = req.body;

      if (title) movie.title = title;
      if (genreId) movie.genreId = genreId;
      if (directorId) movie.directorId = directorId;

      movie
        .save()
        .then(() => res.json(movie))
        .catch(err => res.send(err));
    })
    .catch(err => res.send(err));
}

function destroy(req, res, next) {
  const id = req.params.id; // Supon que el parámetro :id está en la URL

  Movie.findByPk(id)
    .then(movie => {
      if (!movie) {
        return res.status(404).json({ error: 'Película no encontrada' });
      }

      movie
        .destroy()
        .then(() => res.json({ message: 'Película eliminada con éxito' }))
        .catch(err => res.send(err));
    })
    .catch(err => res.send(err));
}

module.exports = { create, list, addActor, index, replace, update, destroy };
