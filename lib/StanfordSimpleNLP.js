var java = require('java');

var xml2js = require('xml2js');

java.options.push('-Xmx4g');

java.classpath.push("" + __dirname + "/../jar/ejml-0.23.jar");

java.classpath.push("" + __dirname + "/../jar/joda-time.jar");

java.classpath.push("" + __dirname + "/../jar/jollyday.jar");

java.classpath.push("" + __dirname + "/../jar/xom.jar");

java.classpath.push("" + __dirname + "/../jar/stanford-corenlp-3.3.1-models.jar");

java.classpath.push("" + __dirname + "/../jar/stanford-corenlp-3.3.1.jar");

var getParsedTree = require('./getParsedTree');

var StanfordSimpleNLP = (function() {
  StanfordSimpleNLP.prototype.defaultOptions = {
    annotators: ['tokenize', 'ssplit', 'pos', 'lemma', 'ner', 'parse', 'dcoref']
  };

  function StanfordSimpleNLP(options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = null;
    }
    if ((callback != null) && typeof callback === 'function') {
      this.loadPipeline(options, callback);
    }
  };

  StanfordSimpleNLP.prototype.loadPipeline = function(options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = this.defaultOptions;
    } else if (options == null) {
      options = this.defaultOptions;
    } else {
      if ((options.annotators == null) || !Array.isArray(options.annotators)) {
        return callback(new Error('No annotators.'));
      }
    }
    return java.newInstance('java.util.Properties', (function(_this) {
      return function(err, properties) {
        return properties.setProperty('annotators', options.annotators.join(', '), function(err) {
          if (err != null) {
            return callback(err);
          }
          return java.newInstance('edu.stanford.nlp.pipeline.StanfordCoreNLP', properties, function(err, pipeline) {
            if (err != null) {
              return callback(err);
            }
            _this.pipeline = pipeline;
            return callback(null);
          });
        });
      };
    })(this));
  };

  StanfordSimpleNLP.prototype.loadPipelineSync = function(options) {
    var properties;
    if (options == null) {
      options = this.defaultOptions;
    }
    properties = java.newInstanceSync('java.util.Properties');
    properties.setPropertySync('annotators', options.annotators.join(', '));
    return this.pipeline = java.newInstanceSync('edu.stanford.nlp.pipeline.StanfordCoreNLP', properties);
  };

  StanfordSimpleNLP.prototype.process = function(text, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {
        xml: {
          explicitRoot: false,
          explicitArray: false,
          attrkey: '$'
        }
      };
    }
    if (this.pipeline == null) {
      return callback(new Error('Load a pipeline first.'));
    }
    return this.pipeline.process(text, (function(_this) {
      return function(err, annotation) {
        if (err != null) {
          return callback(err);
        }
        return java.newInstance('java.io.StringWriter', function(err, stringWriter) {
          if (err != null) {
            return callback(err);
          }
          return _this.pipeline.xmlPrint(annotation, stringWriter, function(err) {
            if (err != null) {
              return callback(err);
            }
            return stringWriter.toString(function(err, xmlString) {
              if (err != null) {
                return callback(err);
              }
              return xml2js.parseString(xmlString, options.xml, function(err, result) {
                var sentence, sentences, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4;
                if (err != null) {
                  return callback(err);
                }
                try {
                  sentences = result != null ? (_ref = result.document) != null ? (_ref1 = _ref.sentences) != null ? _ref1.sentence : void 0 : void 0 : void 0;
                  if (typeof sentences === 'object' && Array.isArray(sentences)) {
                    _ref4 = result != null ? (_ref2 = result.document) != null ? (_ref3 = _ref2.sentences) != null ? _ref3.sentence : void 0 : void 0 : void 0;
                    for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
                      sentence = _ref4[_i];
                      sentence.parsedTree = getParsedTree(sentence != null ? sentence.parse : void 0);
                    }
                  } else {
                    sentences.parsedTree = getParsedTree(sentences != null ? sentences.parse : void 0);
                  }
                } catch (_error) {
                  err = _error;
                  return callback(err);
                }
                return callback(null, result);
              });
            });
          });
        });
      };
    })(this));
  };

  return StanfordSimpleNLP;

})();

module.exports = StanfordSimpleNLP;
