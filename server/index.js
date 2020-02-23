const dotenv = require('dotenv');
dotenv.config({path: '.env'});


const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const client = require('twilio')(
    process.env.TWILIO_SID,
    process.env.TWILIO_TOKEN
);

var cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);


app.use(function(req, response, next) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
  });

app.use(cors());
app.options('*',cors());

app.post('/api/messages', (req, res) => {
    res.header('Content-Type', 'application/json');
    client.messages
      .create({
        from: process.env.TWILIO_NUMBER,
        to: req.body.phoneNumber,
        body: 'Yooooo good to see you. *slaps face* but seriously tho '+req.body.name+', gimme my $' + req.body.cost+ ' dollars!'
      })
      .then(() => {
        res.send(JSON.stringify({ success: true }));
      })
      .catch(err => {
        console.log(err);
        console.log(req);

        res.send(JSON.stringify({ success: false }));
      });
  });


  app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);