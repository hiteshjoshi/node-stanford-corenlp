# node-stanford-corenlp
A simple node.js wrapper for Stanford CoreNLP.

### Quick Demo
* Download [corenlp-3.6.0](http://nlp.stanford.edu/software/stanford-corenlp-full-2015-12-09.zip) ![Download 3.6.0](http://i.imgur.com/vZS62uy.png)
* Extract the content of **standford-corenlp-full-2015-04-20.zip** to ***corenlp*** directory in the root directory of this project
* Run ``` node examples/sentiments.js ```
* Go to [http://localhost:8990](http://localhost:8990/?q=There%20are%20slow%20and%20repetitive%20parts,%20but%20it%20has%20just%20enough%20spice%20to%20keep%20it%20interesting.)

----


#### What is Stanford CoreNLP?
Stanford CoreNLP provides a set of natural language analysis tools which can take raw English language text input and give the base forms of words, their parts of speech, whether they are names of companies, people, etc., normalize dates, times, and numeric quantities, and mark up the structure of sentences in terms of phrases and word dependencies, and indicate which noun phrases refer to the same entities. Stanford CoreNLP is an integrated framework, which make it very easy to apply a bunch of language analysis tools to a piece of text. Starting from plain text, you can run all the tools on it with just two lines of code. Its analyses provide the foundational building blocks for higher-level and domain-specific text understanding applications.

Stanford CoreNLP integrates all our NLP tools, including the part-of-speech (POS) tagger, the named entity recognizer (NER), the parser, and the coreference resolution system, and provides model files for analysis of English. The goal of this project is to enable people to quickly and painlessly get complete linguistic annotations of natural language texts. It is designed to be highly flexible and extensible. With a single option you can change which tools should be enabled and which should be disabled.

The Stanford CoreNLP code is written in Java and licensed under the GNU General Public License (v2 or later). Source is included. Note that this is the full GPL, which allows many free uses, but not its use in distributed proprietary software. The download is 214 MB and requires Java 1.6+.


## Installation

node-stanford-simple-nlp depends on [Stanford CoreNLP](http://nlp.stanford.edu/software/corenlp.shtml) v3.4+. And don't forget to [set proper environment variables](https://github.com/nearinfinity/node-java) like `JAVA_HOME` in your system.

    $ npm install stanford-corenlp

**Important!** You should download `stanford-corenlp-full-2014-06-16.zip` file and unzip to a folder and provide the path in the configuration. You can download the file from [here](http://nlp.stanford.edu/software/stanford-corenlp-full-2014-06-16.zip).

PS : (Use Java 1.8 for corenlp 3.5.0+ )

## Configuration
```javascript
var NLP = require('stanford-corenlp');
var config = {"nlpPath":"./corenlp","version":"3.6.0"};
var coreNLP = new NLP.StanfordNLP(config);
```

## Usage

#### Async mode
```javascript
var NLP = require('stanford-corenlp');

var coreNLP = new NLP.StanfordNLP({

	"nlpPath":"./corenlp",
	"version":"3.6.0",
	//you can skip language if you want to use default english.
	"language":{
		"jar":"./corenlp/stanford-chinese-corenlp-2014-02-24-models.jar",
		"properties":"./corenlp/StanfordCoreNLP-chinese.properties"
	}

},function(err) {
  coreNLP.process('This is so good.', function(err, result) {
    console.log(err,JSON.stringify(result));
  });
});
```

#### Errors
If you are getting error 
Error: Could not create class edu.stanford.nlp.pipeline.StanfordCoreNLP
java.lang.UnsupportedClassVersionError: edu/stanford/nlp/pipeline/StanfordCoreNLP : Unsupported major.minor version 52.0

That's possibly the class was compiled with a version different than what node-java is using. When you compiled node-java was your java home the same?


## License
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

This license also applies to the included Stanford CoreNLP files.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

Author: Hitesh Joshi (me@hiteshjoshi.com). Copyright 2013~2014.
