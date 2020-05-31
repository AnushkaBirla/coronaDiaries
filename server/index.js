const express = require('express');
const cors = require('cors');
const monk = require('monk');
const Filter = require('bad-words');
const rateLimit = require('express-rate-limit');

const app = express();

const db = monk(process.env.MONGO_URI || 'localhost/meower');
const coronaPostList = db.get('coronaPostList'); //collection
const filter = new Filter(); //bad mouth npm module, prevents bad words as input

app.use(cors()); //adds cors as a middleware, will add cors headers to reqs coming to server
app.use(express.json()); //json body parser middlware

app.get('/coronaPostList', (req, res) => { // db storage list
    coronaPostList
        .find()
        .then(coronaPostList => {
            res.json(coronaPostList)
        });
  });

  // add error check
app.get('/coronaPostList/search', (req, res) => {
    let searchInput = {content: req.query.queryString}
    console.log(searchInput);
    coronaPostList
    .find(searchInput)
    .then(searchResults => {
        console.log(searchResults);
        res.json(searchResults)
    });
});

app.post('/coronaPostList', (req, res) => { // client to server this is what happens when an incoming post req happens to the server
    if (isValidCoronaPost(req.body)){
        //insert into DB
        const coronaPost = {
            name: filter.clean(req.body.name.toString().trim()),
            content: filter.clean(req.body.content.toString().trim()),
            created: new Date()
        };

        coronaPostList
           .insert(coronaPost)
           .then(createdCoronaPost => {
             res.json(createdCoronaPost);
           });
    } else {
        res.status(422);
        res.json({           
            message: 'Hey! Name and content are required!'
        });
    }
  });

function isValidCoronaPost(coronaPost) {
    return coronaPost.name && coronaPost.name.toString().trim()  !== '' &&
    coronaPost.content && coronaPost.content.toString().trim() !== '';
    created: new Date()
}

app.listen(5000, () => {
    console.log('Listening on http://localhost:5000');
  });