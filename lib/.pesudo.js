export default class PrefixTree {

  insert(word) {
    // current node is the root of the trie
    let currentNode = this.root;

    // take the word in make lower 
    // split each letter to a string 'w' 'o' 'r' 'd'
    word = word.toLowerCase().split('');

    // for each letter in word
    word.forEach( letter => {

      // if current nodes child is not the letter
      if (!currentNode.children[letter]) {
        // current nodes child is now a new node with the letter data 
        currentNode.children[letter] = new Node(letter);
      }

      // current node moves on to the next child
      currentNode = currentNode.children[letter];
    });

    // if current node's word end property is false 
    if (!currentNode.wordEnd) {
      // incriment word count
      this.wordCount++;
      // flip current nodes wordend property to true
      currentNode.wordEnd = true;  
    }
  }

  suggest(phrase) {

    // current node starts at the root of the trie
    let currentNode = this.root;

    // lower case the phase passed in
    // split into into single letter strings 
    // 'p', 'h', 'r', 'a', 's', 'e' 
    phrase = phrase.toLowerCase().split(''); 
    
    // for each letter of the passed in phrase
    phrase.forEach( letter => {

      // if current node is undefined 
      if (currentNode === undefined) {
        // return an empty array 
        return [];
      // otherwise 
      } else {

        // current node moves on is now the child
        // of current node which matches letter
        currentNode = currentNode.children[letter];
      } 

      // if not the current or not the current nodes child
      // matching the current letter of phrase  
      if (!currentNode || !currentNode.children[letter] ) {
        // return an empty array
        return [];
      // otherwise
      } else {

        // call findSuggestions pass in the current node
        // and pass in phrase put back into a word 'phrase'
        // return find suggestions result 
        return this.findSuggestions(currentNode, phrase.join(''));
        }
      
    });
  }

  findSuggestions(currentNode, phrase, suggestions = []) {
  
    // put all the children letter of current node into 
    // an array ['c', 'h', 'i', 'l', 'd']
    let childrenLetters = Object.keys(currentNode.children);
    
    // for each letter in child
    childrenLetters.forEach( childLetter => {
      
      // letterNode is the child of the current node
      // matching the letter
      let letterNode = currentNode.children[childLetter];

      // newPhrase is the phrase passed in plus the child 
      // letter the for each is iterating over
      let newPhrase = phrase + childLetter;
      
      // if the current letters child has a word end property 
      // of true
      if (letterNode.wordEnd) {

        // push the word and popCount data into the default 
        // empty suggestions array 
        suggestions.push({
          word: newPhrase, popCount: letterNode.popularity
        });
      }
      
      // recusivly call findSuggestions until there are no more
      // words to suggest 
      this.findSuggestions(letterNode, newPhrase, suggestions);
    });
    
    // sort the suggestions by popularity 
    suggestions.sort((a, b) => {        
      return b.popCount - a.popCount;
    });
    
    // return an array of the suggested words 
    return suggestions.map(newWord => {
      return newWord.word;
    });
  }
}


// insert() 

// current node is the root of the trie

// take the word in make lower 
// split each letter to a string 'w' 'o' 'r' 'd'

// for each letter in word

// if current nodes child is not the letter

// current nodes child is now a new node with the letter data 

// current node moves on to the next child

// if current node's word end property is false

// incriment word count

// flip current nodes wordend property to true



// suggest()

// current node starts at the root of the trie

// lower case the phase passed in
// split into into single letter strings 
// 'p', 'h', 'r', 'a', 's', 'e'

// for each letter of the passed in phrase

// if current node is undefined

// return an empty array

// otherwise

// current node moves on is now the child
// of current node which matches letter

// if not the current or not the current nodes child
// matching the current letter of phrase 

// return an empty array

// otherwise

// call findSuggestions pass in the current node
// and pass in phrase put back into a word 'phrase'
// return find suggestions result 