import Node from './Node.js';

export default class PrefixTree {
  constructor () {
    this.root = new Node('');
    this.wordCount = 0;
  }

  insert(word) {
    word = word.toLowerCase().split('');

    let parent = this.root;
    let position = this.root.children;

    for (let i = 0; i < word.length; i++) {
      if (!position.hasOwnProperty(word[i])) {
        position[word[i]] = new Node(word[i]);
      }
      position = position[word[i]].children;
      parent = parent.children[word[i]];
    }
    if (!parent.wordEnd) {
      this.wordCount++;
    }
    parent.wordEnd = true;
  }

  suggest(phrase) {
    
    phrase = phrase.toLowerCase().split('');
    
    let currentNode = this.root;
    
    phrase.forEach(letter => {
      currentNode = currentNode.children[letter];
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
    word.forEach(letter =>{
      currentNode = currentNode.children[letter];
    });
    currentNode.popularity++;
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    });
  }
}