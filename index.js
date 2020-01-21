const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
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
});

app.post('/locations', (req, res)=> {
  //req.body example: {"id":3, lat:"30.23",long:"-97.7"}
  let id = req.body.id;
  let lat = req.body.lat;
  let long = req.body.long;
  let location = {}
  let options = {
    method: 'GET',
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"
      }
  }
  fetch(`http://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}&zoom=18&addressdetails=1`, options)
    .then(res => res.json())
    .then(json => {
  console.log(json)
  location.address = json.address.house_number + json.address.road + json.address.city + json.address.state + json.address.postcode;
  });
  let client = clients.find(client => client.id === id)
  client.lat = lat;
  client.long = long;
  client.location = location.address;
  res.send(client);
})

app.listen(port, ()=> {
  console.log(`listening on port ${port}`)
})