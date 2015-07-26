var NLP = require('./../../');
var path = require('path');
console.log(path.join ( __dirname,'/../../corenlp'))
var config = {
	'nlpPath':path.join ( __dirname,'/../../corenlp'), //the path of corenlp
	'version':'3.5.2	', //what version of corenlp are you using
	'annotators': ['tokenize', 'ssplit', 'pos', 'lemma', 'ner', 'parse'] //optional!

};

var coreNLP = new NLP.StanfordNLP(config);

//Function that does NER & POS
var tagger = function myFunction(title,response) {
 
 //console.log("inside  tagger function")
 //console.log(title)
 coreNLP.process(title, function(err, result) {
      if(err)
        throw err;
      else
        noun_tags_list = []
        ne_tags_list = []
				
        noun_tags = ['NN','NNS','NNP','NNPS'] //list of noun related tags
        ner_types = ['PERSON','LOCATION','ORGANIZATION'] //list of interested entities
        tokens = []
        sentences = result.document.sentences.sentence

				// To handle single sentence titles
				if(! sentences.length){
					console.log('Only a single sentence')
					tokens = tokens.concat(sentences.tokens.token)
				}


				// To handle multiple sentence titles. 
				//Datastrucutre is slightly different for single is dictionary/map and multiple is array
				sent_tokens = []
				for (var i = 0; i < sentences.length; i++) {
					sent_tokens = sentences[i].tokens.token
		
					//console.log("sent tokens here 2")
					tokens = tokens.concat(sent_tokens)
				}

				//console.log(tokens.length)		

				// Get only nouns
				for (var i = 0; i < tokens.length; i++) {
			
					//console.log(tokens[i].NER)
					//Entities
					if (ner_types.indexOf(tokens[i].NER) > -1) {
						ne_tags_list = ne_tags_list.concat(tokens[i].word)
					}

					//nouns
					if (noun_tags.indexOf(tokens[i].POS) > -1) {
    				//console.log(tokens[i].word);
    				//console.log(tokens[i].POS);
						noun_tags_list = noun_tags_list.concat(tokens[i].word)

					}
				}

				//console.log(tags_list)
    		console.log('results returned',JSON.stringify({'nouns':noun_tags_list,'er':ne_tags_list}))

   			///Set headers and return JSON
    		response.writeHead(200);
        response.end(JSON.stringify({'nouns':noun_tags_list,'ne':ne_tags_list}));
  });


}


var http = require('http');
var url = require('url');
var server = http.createServer(function (request, response) {

var data = '';

request
	.on('data', function (chunk) {
		// Get all data from request
   	data += chunk;
		 })
	.on('end', function(){
    //Once you have all the data from the request
		console.log("done collecting data")
		console.log(data)
    json_data = JSON.parse(data)
	  console.log(json_data)

		//call tagger function to get all nouns
    tagger(json_data.title,response)

 		});


});

server.listen(8990);
