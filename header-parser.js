var expres = require('express');
var bodyParser = require('body-parser');
var cors  = require('cors');
var get_ip = require('ipware')().get_ip;
var userAgent = require('express-useragent');
var ipAdd = require('ip');



var project = module.exports = expres();
project.use(bodyParser.json());
project.use(cors());
project.use(userAgent.express());

var apiUrl = "/api/whoami";



project.get(apiUrl, function(req,res,next){

    var systemInfo = {
        ipaddress: ipAdd.address(),
        //ipaddress: get_ip(req).clientIp,
        language: (req.acceptsLanguages())[0],
        software: req.useragent.os
        }

    res.json({
        "ipaddress": systemInfo.ipaddress,
        "language": systemInfo.language,
        "software": systemInfo.software
    });
});

project.listen(8000, function(){
    console.log('Node is working');
})