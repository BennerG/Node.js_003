const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// get post
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// add post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
})

// delete post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})

// load all posts
async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://abc123:LbPLxNkaOsr3ePEf@vue-express.empof.mongodb.net/vue-express?retryWrites=true&w=majority', {
        useUnifiedTopology: true
    });
    // removed "useNewUrlParser: true" from the client ctor above
    return client.db('vue-express').collection('posts');
}

module.exports = router;
