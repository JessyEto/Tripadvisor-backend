require('dotenv').config();
const express = require('express');
const formidable = require('express-formidable');
const cors = require('cors');

//

const app = express();
app.use(formidable());
app.use(cors());

// Configuration of Mailgun

const API_KEY = process.env.API_KEY;
const DOMAIN = process.env.DOMAIN;
const mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN });

//

app.post('/form', (req, res) => {
  try {
    console.log(req.fields);

    const { firstname, lastname, email, message } = req.fields;

    const data = {
      from: `${firstname} ${lastname} <${email}>`,
      to: 'jessy.dev.eto@gmail.com',
      subject: 'Hello jessy',
      text: message,
    };

    mailgun.messages().send(data, (error, body) => {
      if (!error) {
        res.json({ message: 'Success' });
      } else {
        res.status(401).json(error);
      }
    });
  } catch (error) {
    res.status(400).json({ error: message.error });
  }
});

app.all('*', (req, res) => {
  res.json({ message: 'Page not found' });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log('server started');
});
