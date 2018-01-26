
var express = require('express');
var app = express();
const fs = require('fs');



app.set('port', 3009);
app.use(express.static('src'));


app.use(function (req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
});

app.get('/', function (req, res) {
    res.send("hola!");
});



app.get('/test', function (req, res) {
  

    
    const filePath =  "/var/www/nodewebkit-EjecutarRemoto/src/acceso.exe" // or any file format
    const fileName = "package.json";
      // Check if file specified by the filePath exists 
      fs.exists(filePath, function(exists){
          if (exists) {     
            // Content-type is very interesting part that guarantee that
            // Web browser will handle response in an appropriate manner.
            res.writeHead(200, {
              "Content-Type": "application/octet-stream",
              "Content-Disposition": "attachment; filename=" + filePath
            });
            fs.createReadStream(filePath).pipe(res);
          } else {
            res.writeHead(400, {"Content-Type": "text/plain"});
            res.end("ERROR File does not exist");
          }
        });
        
    
});



var server = app.listen(app.get('port'), function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Express corriendo en el Puerto: http://%s:%s", host, port)

})

