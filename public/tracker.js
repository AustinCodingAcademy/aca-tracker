const cors = require('cors')

app.use(cors())

var clientId = null;

function startTracking() {
  let name = document.getElementById("textEntry").value
  fetch(`http://localhost:4000/clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 'name': name })
  })
    .then(res => res.json())
    .then(data => {
      clientId = data.clientId;
      console.log(data)
    });
  setInterval(fetchLoc, 2000)
}

function fetchLoc() {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  // let promise = new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(success, error, options);
  // })
  // promise.then(() => {
  //   let crd = [];
  // }
  // )
}

function success(pos) {
  const crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);

  fetch(`http://localhost:4000/locations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 'id': clientId, 'lat': crd.latitude, 'long': crd.longitude })
  })
  // .then(res => res.json())
  // .then(data => {
  //   console.log(data)
  //   let newLoc = document.createElement('li')
  //   newLoc.innerHTML = data.name;
  //   locTracker.appendChild(newLoc)
  // });
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}



function listLocations() {
  fetch(`http://localhost:4000/locations`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(res => res.json())
    .then(data => {
      locTracker.innerHTML = "";
      console.log(data[0].location)
      if (data.length !== 0) {
        data.map(person => {
          let newLoc = document.createElement('li')
          newLoc.innerHTML = 
            `Name: ${person.name} 
            Location: ${JSON.stringify(person.location)}`;
          locTracker.appendChild(newLoc)
        })
      }
    });
}



