const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch')
const cors = require('cors')

app.use(cors())

const port = process.env.PORT || 4000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


let lastClientId = 0;

let clients = [];

app.use((req, res, next) => {
  next()
})

app.post('/clients', (req, res) => {
  lastClientId += 1;
  let newLoc = {
    'name': req.body.name,
    'clientId': lastClientId,
    'lat': "",
    'long': "",
    'location': ""
  };
  clients.push(newLoc);
  res.send(newLoc);
  console.log(clients)
})

app.get('/locations', (req, res) => {
  res.send(clients);
})

app.post('/locations', (req, res) => {
  let lat = Number(req.body.lat)
  let lon = Number(req.body.long)
  fetch(`http://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })
    .then(res => res.json())
    .then(data => {
      let obj = clients.find(client => client.clientId === Number(req.body.id));
      obj.lat = data.lat
      obj.long = data.lon;
      obj.location = data.address;
      res.send(obj);
      console.log(obj)
    });
})



app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`))