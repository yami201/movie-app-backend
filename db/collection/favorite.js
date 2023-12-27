const { db } = require('../client');
const favorites = db.collection('favorites');


const addFavorite = async ({ user_id, movie_id}) => {

    const favorite = await favorites.findOne({user_id, movie_id});

    if(!favorite) {
        await favorites.insertOne({
            user_id,
            movie_id,
        });
    } else {
        await favorites.deleteOne({
            user_id,
            movie_id,
        });
    }
}

const getFavorites = async ({ user_id }) => {
    const favs = favorites.find({user_id});

    return favs.toArray();
}
const isFavorite = async ({ user_id, movie_id }) => {
    const favs = favorites.find({user_id, movie_id : parseInt(movie_id)});

    return favs.toArray();
}
module.exports = {
    addFavorite,
    getFavorites,
    isFavorite
}