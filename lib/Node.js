class Node {
  constructor (letter, wordEnd) {
    this.letter = letter;
    this.children = {};
    this.wordEnd = wordEnd;
    this.popularity = 0; 
  }	
}

module.exports = Node;