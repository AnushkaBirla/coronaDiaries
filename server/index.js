const express = require('express');
const cors = require('cors');
const monk = require('monk');
const Filter = require('bad-words');
//const rateLimit = require('express-rate-limit');

const app = express();

const db = monk(process.env.MONGO_URI || 'localhost/meower');
const mews = db.get('mews'); //collection
const filter = new Filter();

app.use(cors()); //adds cors as a middleware, will add cors headers to reqs coming to server
app.use(express.json()); //json body parser middlware

app.get('/', (req, res) => { // server to client
    res.json({
      message: 'This TEST is the response'
    }); 
  });

app.get('/mews', (req, res) => { // db storage list
    mews
        .find()
        .then(mews => {
            res.json(mews)
        });
  });

  // add error check
  app.get('/mews/search', (req, res) => {
      let input = {content: req.query.queryString}
      console.log(input);
      mews
        .find(input)
        .then(searchResults => {
            console.log(searchResults);
            res.json(searchResults)
        });
  });

function isValidMew(mew) {
    return mew.name && mew.name.toString().trim()  !== '' && 
    mew.content && mew.content.toString().trim() !== '';
    created: new Date()
}

app.post('/mews', (req, res) => { // client to server this is what happens when an incoming post req happens to the server
    if (isValidMew(req.body)){ 
        //insert into DB
        const mew = {
            name: filter.clean(req.body.name.toString().trim()),
            content: filter.clean(req.body.content.toString().trim()),
            created: new Date()
        };

        mews
           .insert(mew)
           .then(createdMew => {
             res.json(createdMew);
           });
    } else {
        res.status(422);
        res.json({           
            message: 'Hey! Name and content are required!'
        });
    }
  });

app.listen(5000, () => {
    console.log('Listening on http://localhost:5000');
  });