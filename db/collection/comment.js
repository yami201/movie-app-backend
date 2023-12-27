const { db } = require('../client');
const comments = db.collection('comments');

const addComment = async ({ email, movie_id, comment}) => {
        await comments.insertOne({
            email,
            movie_id,
            comment,
        });
}
const getComments = async ({ movie_id }) => {
    const movieComments = comments.find({movie_id});
    return movieComments.toArray();
}
module.exports = {
    addComment,
    getComments,
}