var ParsedTree = (function() {
  function ParsedTree(treeString) {
    this.treeString = treeString;
    this.parsedList = [];
    this.wordIndex = 1;
    this.parseRecursive(this.treeString, this.parsedList);
    this.parsedTree = this.parsedList[0];
    this.parsedTree;
  }

  ParsedTree.prototype.parseRecursive = function(treeString, currentPosition) {
    var bracketCount, char, currentTreeString, firstToken, isBracket, newList, splittedTokens, _i, _len;
    treeString = treeString.slice(1, -1);
    splittedTokens = treeString.split(' ');
    firstToken = splittedTokens[0];
    treeString = splittedTokens.slice(1).join(' ');
    newList = [];
    currentPosition.push({
      type: firstToken,
      children: newList
    });
    currentPosition = newList;
    bracketCount = 0;
    currentTreeString = '';
    isBracket = false;
    for (_i = 0, _len = treeString.length; _i < _len; _i++) {
      char = treeString[_i];
      currentTreeString += char;
      if (char === '(') {
        bracketCount++;
        isBracket = true;
      } else if (char === ')') {
        bracketCount--;
        if (bracketCount === 0) {
          currentTreeString = currentTreeString.replace(/^\s+|\s+$/g, '');
          this.parseRecursive(currentTreeString, currentPosition);
          currentTreeString = '';
        }
      }
    }
    if (!isBracket) {
      currentPosition.push({
        type: firstToken,
        word: splittedTokens[1],
        id: this.wordIndex
      });
      return this.wordIndex++;
    }
  };

  return ParsedTree;

})();

var getParsedTree = function(treeString) {
  return treeString !== void 0 ? new ParsedTree(treeString).parsedTree : {};
};

module.exports = getParsedTree;
