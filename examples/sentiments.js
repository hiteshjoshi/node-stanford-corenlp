var NLP = require('../');
var path = require('path');

var config = {'nlpPath':path.join ( __dirname,'./../corenlp'),'version':'3.5.2'};

var coreNLP = new NLP.StanfordNLP(config);
coreNLP.loadPipelineSync();

coreNLP.process('This is so good.', function(err, result) {
    console.log(err,JSON.stringify(result));
});