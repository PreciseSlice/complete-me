import Node from './Node.js';

export default class BinaryTree {
  constructor () {
  	this.root = new Node('');
  	this.count = 0;
  }

  insert(word) {
  	this.count++;
  	word = word.split('');

  	let position = this.root.children;
  	let parent = this.root;

  	for(let i =0; i < word.length; i++){
  		if (!position.hasOwnProperty(word[i])) {
  			position[word[i]] = new Node(word[i]);
  		}
  	position = position[word[i]].children;
  	parent = parent.children[word[i]];
  }
  parent.wordEnd = true;

	}

	populate(dictionary) {
		dictionary.forEach(word => {
			this.insert(word);
		});
	}
}