
var http = require('http');
var mongoClient = require('mongodb').MongoClient;

var mongoDBUri = process.env.MONGODB_URI || '';
var port = process.env.PORT || 80;

mongoClient.connect(mongoDBUri, function (err, client) {

    http.createServer(function (req, res) {

        if(err){
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end(`Failed to connect to the database.\n${err}`)
            return;
        }
        
        const db = client.db('logs');
        const requests = db.collection('requests');
 
        requests.count(function(error, count){
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write('<!DOCTYPE "html">');
            response.write("<html>");
            response.write("<head>");
            response.write("<title>Hello World Page</title>");
            response.write("<style> .H1 {font-size: 4em;background-color: darkolivegreen;height: 10em;text-align: center;display: flex;align-items: center}</style>");
            response.write("</head>");
            response.write("<body>");
            response.write("Hello World!\nThere are ${count} request records.");
            response.write("</body>");
            response.write("</html>");
            response.end();
            res.end();
        })

        requests.insertOne({
            ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            time: Date.now()
        });
    }).listen(port);

});