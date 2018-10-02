 //make a fetch get to/locations...expect back an array of objects//
 //loop the array,append a div to the body with name and location in it//
 fetch ("https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition")
 .then(r=>r.json()).then(d=>console.log(d));
  d.map.push('<name','location>').then(d=>console.log(d));
  
