// app.js

var express = require('express');
var app = express();
var httpProxy = require('http-proxy');
var proxyServer = httpProxy.createProxyServer({secure: false});
var config = require('config');
var hostConfig = config.get('hostConfig');
const reg = new RegExp('/host1(.*)');
//const reg2 = new RegExp('/[^/]*/*');


app.all("/host1/*", function(req, res) {
    console.log('redirecting to Host1');
    console.log(hostConfig.host1);
    console.log(req.url);
    console.log(req.url.match(reg)[1]);
    req.url = req.url.match(reg)[1];
    console.log(req.url);
    // var targetUrl = hostConfig.host1+req.url.match(reg)[1];
    var targetUrl = hostConfig.host1;
    console.log(targetUrl);
    proxyServer.web(req, res, {target: targetUrl});
});

app.all("/host2/*", function(req, res) {
    console.log('redirecting to Host2');
    console.log(hostConfig.host2);
    console.log(req.url);
    console.log(req.method);
    console.log(req.headers);
    //proxyServer.web(req, res, {target: ServerTwo});
});

app.listen(3000, function(){
	console.log('listening on 3000');
});