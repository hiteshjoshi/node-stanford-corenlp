var NLP = require('../');
var path = require('path');

var config = {'nlpPath':path.join ( __dirname,'./../corenlp'),'version':'3.5.2'};

var coreNLP = new NLP.StanfordNLP(config);
coreNLP.loadPipelineSync();


var http = require('http');
var url = require('url');

var server = http.createServer(function (request, response) {
  var queryData = url.parse(request.url, true).query;
  response.writeHead(200, {"Content-Type": "text/plain"});

  if (queryData.name) {
    
    coreNLP.process(queryData, function(err, result) {
	    if(err)
	    	throw err;
	    else
	    	response.end(JSON.stringify(result));
	});
    

  } else {
    response.end("Hello standford-coreNLP!\n");
  }
});

server.listen(8990);