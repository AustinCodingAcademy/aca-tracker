const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let port = 8000;

app.use(bodyParser.json());
app.use(express.static('public'));

let lastClientId = 0;

const clients = [];

app.post('/clients', (req, res)=> {
  lastClientId = lastClientId + 1;
  let createdClient = {
    name: req.body.name,
    clientId: lastClientId,
    lat: "",
    long: "",
    location: "",
  }
  clients.push(createdClient)
  res.json(createdClient)
})

app.listen(port, ()=> {
  console.log(`listening on port ${port}`)
})