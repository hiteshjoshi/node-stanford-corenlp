var should = require('should');

var standfordSimpleNlpModule = require('../index');

var StanfordSimpleNLP = standfordSimpleNlpModule.StanfordSimpleNLP;

describe('standfordSimpleNlpModule', function() {
  return describe('StandordSimpleNLP', function() {
    var stanfordSimpleNLP;
    stanfordSimpleNLP = new StanfordSimpleNLP();
    describe('.loadPipeline(...)', function() {
      return it('should be done', function(done) {
        return stanfordSimpleNLP.loadPipeline(function(err) {
          should.not.exist(err);
          return done();
        });
      });
    });
    describe('.loadPipelineSync(...)', function() {
      return it('should be done', function() {
        return stanfordSimpleNLP.loadPipelineSync();
      });
    });
    return describe('.process(...)', function() {
      return it('should be done', function(done) {
        return stanfordSimpleNLP.process('Hello, Sydney! I am Austin.', function(err, result) {
          should.not.exist(err);
          should.exist(result);
          return done();
        });
      });
    });
  });
});
