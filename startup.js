var http = require("http"),
    fs = require("fs");

function serverStaticFile(res, path, contentType, resposeCode){
    if(!resposeCode) resposeCode = 200;
    try{
        fs.readFile(__dirname + path, function(err, data){
            if(err){
                res.writeHead(500, {"Content-Type" : "text/plain"});
                res.end('500 - Internal Error');
            }else{
                res.writeHead(resposeCode, {'Content-Type':contentType});
                res.end(data);
            }
        });
    }catch(err){
        console.log(err);
        throw err;
    }

}

var server = http.createServer(function(req, res){
    var path = req.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase();
    switch (path) {
        case '':
            serverStaticFile(res, '/public/home.html', 'text/html', 200);
            break;
        case '/about':
            serverStaticFile(res, '/public/about.html', 'text/html', 200);
            break;
        case '/img/logo.jpg':
                serverStaticFile(res, '/public/img/logo.jpg', 'text/html', 200);
                break;
        default:
            res.writeHead(404, {"Content-Type":'text/plain'});
            res.end('Not Found');
            break;
    }
});

console.log(server);
server.listen(3000);

console.log("server is listenning on port 3000");
