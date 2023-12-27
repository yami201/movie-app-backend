const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

const { addFavorite, getFavorites, isFavorite } = require('./db/collection/favorite')
const { addComment, getComments } = require('./db/collection/comment')
const { saveUser, checkUser} = require('./db/collection/user')

app.use(express.json())

app.post('/user', async (req, res) => {
    const { uid, email, password } = req.body;
    await saveUser({ uid, email, password })
    res.status(200).send({ uid, email, password })
})

app.get('/user', async (req, res) => {
    const { email } = req.query;
    const user = await checkUser(email)
    res.send(user)
})

app.post('/favorite', async (req, res) => {
    const { user_id, movie_id } = req.body;
    await addFavorite({ user_id, movie_id })
    res.status(200).send({ok : true})
})


app.get('/favorite/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const favorites = await getFavorites({ user_id })
    res.send(favorites)
})
app.get('/favorite/:user_id/:movie_id', async (req, res) => {
    const { user_id, movie_id } = req.params;
    const favorite = await isFavorite({ user_id, movie_id })
    res.send(!!favorite.length)
})

app.post('/comment', async (req, res) => {
    const { email, movie_id, comment } = req.body;
    await addComment({ email, movie_id, comment })
    res.status(200).send({ok : true})
})

app.get('/comment', async (req, res) => {
    const { movie_id } = req.query;
    const comments = await getComments({ movie_id: parseInt(movie_id) })
    res.status(200).send(comments)
})

app.listen(80, () => {
    console.log('listening on 8080')
})
