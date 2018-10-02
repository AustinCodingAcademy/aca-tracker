//Create a Server, make sure it is listening//
//make sure to use body-parser//
//Tell Express what folder to look in to serve files//
let express = require("express");
let bodyParser = require("body-parser");
const app = express();
app.use (bodyParser.json());
app.listen(3002,(err)=> {
    if (err) {
        return console.log("Error",err);
    }
    
});

//Tell Express what folder to look in to server static files... i created file 'file.js//

app.use(express.static('public'));
//use this information to make a node fetch call//
const fetch = require('node-fetch');
fetch('https://repl.it/@w56578/TerrificSnappyConditionals')
.then(res=>res.json())
.then (json=>{
    console.log(json);
});