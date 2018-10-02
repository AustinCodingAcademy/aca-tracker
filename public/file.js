//make sure the server can serve a static file//
//create a variable 'lastClientId=0//
//create a variable 'clients[]'//
 
app.use(function(request,response,next){
    return response.send("What do you want?");

});