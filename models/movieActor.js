module.exports=(sequelize, type)=>{

    const MovieActor = sequelize.define('movie_actor',{
    id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
    movieId: type.INTEGER,
    actorId: type.INTEGER
    });
    return MovieActor;
};

