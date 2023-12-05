// Create web server
var http = require("http");
var fs = require("fs");
var url = require("url");
var comments = [];

var server = http.createServer(function(req,res){
    // parse the url
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;
    // if the url is / or index.html
    if(pathname === "/" || pathname === "/index.html"){
        // read the index.html
        var indexData = fs.readFileSync("./index.html","utf-8");
        // replace the comments
        var commentsStr = "";
        comments.forEach(function(item){
            commentsStr += `<li>${item}</li>`;
        });
        indexData = indexData.replace("comments",commentsStr);
        // response the data
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(indexData);
    }else if(pathname === "/addComment"){
        // add the comment
        comments.push(urlObj.query.comment);
        // redirect to index.html
        res.writeHead(302,{"Location":"/"});
        res.end();
    }else{
        // read the static resource
        var rs = fs.createReadStream("."+pathname);
        // response the data
        rs.pipe(res);
    }
});

server.listen(8080,function(){
    console.log("Server is running on 8080");
});