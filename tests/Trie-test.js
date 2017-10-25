import fs from 'fs';
const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

import { expect } from 'chai';
import PrefixTree from '../lib/Trie.js';
import Node from '../lib/Node.js';

let prefixTree;
let node;

describe('Phase one testing', () => {

	  beforeEach(() => {
    prefixTree = new PrefixTree();
    node = new Node('');
  });


	it('should create a prefixTree object', () => {

    expect(prefixTree).to.be.an('object');
  });

	it('Should be able to take in a word', () => {
		prefixTree.insert('pizza');
		expect(
			prefixTree.root.children
			.p.children
			.i.children
			.z.children
			.z.children
			.a.letter).to.equal('a');
	});

  it('should have a node as the root', () => {
 
  	expect(prefixTree.root).to.deep.equal(node);
  });

	it('should keep a count of how many words have been inserted', () => {

		prefixTree.insert('cat');
		expect(prefixTree.count).to.equal(1);
		
		prefixTree.insert('dog');
		expect(prefixTree.count).to.equal(2);
		
		prefixTree.insert('bird');
		expect(prefixTree.count).to.equal(3);
	});

	it('should populate a dictionary', () => {

		prefixTree.populate(dictionary);
		expect(prefixTree.count).to.equal(235886);
	});

});

describe('Suggest testing', () => {

	it('should return an array', () => {

	expect(prefixTree.suggest('pizz')).to.be.an('array');
	expect(prefixTree.suggest('pizz')).to.deep.equal(['pizza', 'pizzeria', 'pizzicato', 'pizzle']);
	});

});