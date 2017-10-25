import Node from './Node.js';

import fs from 'fs';

const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

export default class PrefixTree {
  constructor () {
  	this.root = new Node('');
  	this.count = 0;
  	this.suggestions = [];
  }

// insert pizza
  insert(word) {
  	// increase word count
  	this.count++;
  	// turn word into comma seperated array
   	word = word.split('');
		//[ p, i, z, z, a ]

  	// root node
  	let parent = this.root;
  	let position = this.root.children;


  	for(let i =0; i < word.length; i++){
//The hasOwnProperty() method returns a boolean indicating whether the object has the specified property as own (not inherited) property.
      // if letter does not exist in child object
  		if (!position.hasOwnProperty(word[i])) {
        // create node for letter
  			position[word[i]] = new Node(word[i]);
  		}
  	// travel to child letter node
  	position = position[word[i]].children;
  	parent = parent.children[word[i]];
  }
  parent.wordEnd = true;
  // console.log(JSON.stringify(this, null, 4));
	}

	populate(dictionary) {
		dictionary.forEach(word => {
			this.insert(word);
		});
	}

	suggest(phrase) {
    this.suggestions = [];
    
    phrase = phrase.split('');
    
    let currentNode = this.root;
    
    phrase.forEach(letter => {
    	currentNode = currentNode.children[letter];
    });
        
    return this.findSuggestions(currentNode, phrase.join(''));
  }
    
  findSuggestions(currentNode, phrase) {
    
    let childrenLetters = Object.keys(currentNode.children);
        
    childrenLetters.forEach(childLetter => {
      
      let letterNode = currentNode.children[childLetter];
      let newPhrase = phrase + childLetter;
        
        if (letterNode.wordEnd) {
                this.suggestions.push({word: newPhrase, popCount: letterNode.popularity});
        }
        
        return this.findSuggestions(letterNode, newPhrase);
        });

        this.suggestions.sort((a, b) => {
        
        return b.popCount - a.popCount;
        });

        return this.suggestions.map(newWord => {
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

}