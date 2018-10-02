//Make a route for a POST to path '/clients'//
let express = require("express");
const router = express.router();
let {update}= require ("../client/Controller");
var lastClientId=0;
var clients = [];
//The server should increment lastClientId by one//
router.post(lastClientId,(request,response,next)=>{
    response.send(lastClientId+1)
});
//The server should create a new object and add it to the clients array//
router.post(clients,(request,response,next)=>{
    clients.push(request.body)
    response.json({name:"theName",clientId:lastClientId,lat:"",long:"",location:""})
});


module.exports = router;