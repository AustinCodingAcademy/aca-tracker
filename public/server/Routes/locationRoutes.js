//Make a route for a POST path to '/locations'//
//the server should expect to recieve a body as {}//
router.post('/locations',(request,response,next)=>{
    response.json(request.body)
});
//use this information to make a node fetch call//
//extract the address from this call//
const fetch = require('node-fetch');
fetch('https://repl.it/@w56578/TerrificSnappyConditionals')
.then(res=>res.json())
.then (json=>{
    console.log(json);
});
//find the appropriate object from the array by id with find //

router.get('/locations/:Id',(request,response,next)=>{
    response.json({theidfromthepath:request.params.id})
});
//update the keys 'lat,long,location... send back this object as json//
//IM UNSURE OF THIS ONE//s

router.put('/locations/:Id',(request,response,next)=>{
    response.json({theidfromthepath:request.parms.id})
});
//make aroute for a GET to path/locations, send back the'clients'array as a json//
router.get('/locations',(request,response,next)=>{
    response.json({clients})
});