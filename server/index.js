const TWILIO_ACCOUNT_SID='AC00f3bc1d02254ed45495f4554c6a3ddd';
const TWILIO_AUTH_TOKEN='35e4bc37f36052df5e4d9e1fa0c3737a';
const TWILIO_PHONE_NUMBER='+19084021532';


const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const client = require('twilio')(
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN
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
    console.log(req);
    client.messages
      .create({
        from: TWILIO_PHONE_NUMBER,
        to: '9085528747',
        body: 'fk me'
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