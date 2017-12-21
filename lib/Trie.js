import Node from './Node.js';

export default class PrefixTree {
  constructor () {
    this.root = new Node('');
    this.wordCount = 0;
  }

  insert(word) {
    let currentNode = this.root;

    word = word.toLowerCase().split(''); 

    word.forEach( (letter) => { 
      if (!currentNode.children[letter]) { 
        currentNode.children[letter] = new Node(letter);
      }

      currentNode = currentNode.children[letter];
    });

    if (!currentNode.wordEnd) {
      this.wordCount++;
      currentNode.wordEnd = true;
    }
  }

  suggest(phrase) {
    
    phrase = phrase.toLowerCase().split('');
    
    let currentNode = this.root;
    
    phrase.forEach(letter => {
      if (currentNode === undefined) {
        return [];
      } else {
        currentNode = currentNode.children[letter];
      }
    });

    if (!currentNode || !currentNode.children) {
      return [];
    } else {
      return this.findSuggestions(currentNode, phrase.join(''));
    }
  }
    
  findSuggestions(currentNode, phrase, suggestions = []) {
    
    let childrenLetters = Object.keys(currentNode.children);
        
    childrenLetters.forEach(childLetter => {
      
      let letterNode = currentNode.children[childLetter];
      let newPhrase = phrase + childLetter;
        
      if (letterNode.wordEnd) {
        suggestions.push({
          word: newPhrase, popCount: letterNode.popularity
        });
      }        
      this.findSuggestions(letterNode, newPhrase, suggestions);
    });

    suggestions.sort((a, b) => {        
      return b.popCount - a.popCount;
    });

    return suggestions.map(newWord => {
      return newWord.word;
    });
  }

  select(word) { 
    let currentNode = this.root;

    word = word.split('');
    word.forEach(letter => {
      currentNode = currentNode.children[letter];
    });
    currentNode.popularity++;
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    });
  }

  delete(word) { 
    let currentNode = this.traverse(word);
    currentNode.wordEnd = false;
    this.deleteHelper(word); 
  }

  deleteHelper(word) {
    while (word.length) {
      let lastLetter = word.slice(-1);
      word = word.slice(0, -1);

      let currentNode = this.traverse(word);

      if (Object.keys(currentNode.children[lastLetter].children).length &&
        !currentNode.children[lastLetter].wordEnd) {
          delete(currentNode.children[lastLetter]);
      }
    }
  }

  traverse(word) {
    let currentNode = this.root;
    let wordArray = [...word];

    wordArray.forEach( letter => {
      currentNode = currentNode.children[letter];
    });

    return currentNode;
  }

}