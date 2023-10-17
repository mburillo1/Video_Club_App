const Sequelize=require('sequelize');

const directorModel = require('./models/director');
const genreModel = require('./models/genre');
const movieModel = require('./models/movie');
const actorModel = require('./models/actor');
const bookingModel = require('./models/booking');
const copyModel = require('./models/copy');
const memberModel = require('./models/member');
const movieActorModel = require('./models/movieActor');

/*
  1) Nombre de la base de datos
  2) Usuario
  3) Contraseña
  4) Objeto de configuracion ORM
*/

const sequelize = new Sequelize('video_club','root','ssdsdg54',{
  host: '127.0.0.1',
  dialect: 'mysql'
});

const Director = directorModel(sequelize,Sequelize);
const Genre = genreModel(sequelize, Sequelize);
const Movie = movieModel(sequelize, Sequelize);
const Actor = actorModel(sequelize, Sequelize);
const MovieActor = movieActorModel(sequelize, Sequelize);
const Booking = bookingModel(sequelize, Sequelize);
const Copy = copyModel(sequelize, Sequelize);
const Member = memberModel(sequelize, Sequelize);

//Un genero puede tener muchas peliculas 
Genre.hasMany(Movie, {as:'movies'});
//una pelicula tiene un genero
Movie.belongsTo(Genre,{as:'genre'});

//Un director puede tener muchas peliculas
Director.hasMany(Movie,{as:'movies'});
//Una pelicula tiene un director
Movie.belongsTo(Director,{as:'director'});

//Un actor participa en muchas peliculas
MovieActor.belongsTo(Movie,{foreignKey:'movieId'});
//En una pelicula paticipan muchos actores
MovieActor.belongsTo(Actor,{foreignKey:'actorsId'});

Movie.belongsToMany(Actor,{
  foreignKey: 'actorId',
  as:'actors',
  through: 'movies_actors'
});

Actor.belongsTo(Movie,{
  foreignKey: 'movieId',
  as:'movies',
  through: 'movies_actors'
})

sequelize.sync({
  force:true
}).then(()=>{
   console.log('Base de datos sincronizada.');
});

module.exports={ Director, Genre, Movie,Actor, MovieActor, Booking, Copy, Member};