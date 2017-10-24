import fs from 'fs';
const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

import { expect } from 'chai';
import BinaryTree from '../lib/Trie.js';
import Node from '../lib/Node.js';

let binaryTree;
let node;

describe('Phase one testing', () => {

	  beforeEach(() => {
    binaryTree = new BinaryTree();
    node = new Node('');
  });

	it('should create a BinaryTree object', () => {


    expect(binaryTree).to.be.an('object');
  });

  it('should have a node as the root', () => {
 
  	expect(binaryTree.root).to.deep.equal(node);
  });

	it.skip('should be able to take in a word', () => {


		binaryTree.insert('p');

    expect(binaryTree.root.data).to.equal('p');
	});

	it('should keep a count of how many words have been inserted', () => {

		
		binaryTree.insert('cat');
		expect(binaryTree.count).to.equal(1);
		
		binaryTree.insert('dog');
		expect(binaryTree.count).to.equal(2);
		
		binaryTree.insert('bird');
		expect(binaryTree.count).to.equal(3);
	});

	it('should populate a dictionary', () => {

		binaryTree.populate(dictionary);
		expect(binaryTree.count).to.equal(235886);
	});

});