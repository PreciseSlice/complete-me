import fs from 'fs';
const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

import { expect } from 'chai';
import PrefixTree from '../lib/Trie.js';
import Node from '../lib/Node.js';

let prefixTree;
let node;

	  beforeEach(() => {
    prefixTree = new PrefixTree();
    node = new Node('');
  });

describe('PrefixTree unit testing', () => {


	it('should create a prefixTree object', () => {

    expect(prefixTree).to.be.an('object');
  });


  it('should have a node as the root', () => {
 
  	expect(prefixTree.root).to.deep.equal(node);
  });


	describe('Insert method unit testing', () => {

		it('should be a function', () => {

		expect(prefixTree.insert).to.be.a('function');
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

		it('Should be able to take in multiple words', () => {
			prefixTree.insert('pizza');
			expect(
				prefixTree.root.children
				.p.children
				.i.children
				.z.children
				.z.children
				.a.letter).to.equal('a');

			prefixTree.insert('dog');
			expect(
				prefixTree.root.children
				.d.children
				.o.children
				.g.letter).to.equal('g');
		});
	
		it('should convert characters enetered to lower case', () => {
	    let prefixTree = new PrefixTree();


			prefixTree.populate(dictionary);
			prefixTree.insert('PIZZ');
			expect(prefixTree.suggest('pizz')).to.deep.equal(['pizza', 'pizzeria', 'pizzicato', 'pizzle']);
		});

	});


	describe('Count unit testing', () => {

		it('should keep a count of how many words have been inserted', () => {
			let prefixTree = new PrefixTree();

			expect(prefixTree.wordCount).to.equal(0);
			prefixTree.insert('cat');
			expect(prefixTree.wordCount).to.equal(1);
			
			prefixTree.insert('dog');
			expect(prefixTree.wordCount).to.equal(2);
			
			prefixTree.insert('bird');
			expect(prefixTree.wordCount).to.equal(3);
		});

		it('should not add the same word twice to the tree', () => {
		let	prefixTree = new PrefixTree();

			expect(prefixTree.wordCount).to.equal(0);
			prefixTree.insert('pizza');
			expect(prefixTree.wordCount).to.equal(1);

			prefixTree.insert('pizza');
			expect(prefixTree.wordCount).to.equal(1);
		});
	});


	describe('Suggest method unit testing', () => {

		it('should be a function', () => {

		expect(prefixTree.suggest).to.be.a('function');
		});

		it('should return an array', () => {

		expect(prefixTree.suggest('')).to.be.an('array');
		expect(prefixTree.suggest('')).to.deep.equal([]);
		});

		it('should not suggest anything if the word does not exist', () => {
			prefixTree.insert('dhgfs');
			expect(prefixTree.suggest('dhgfs')).to.deep.equal([]);
		});

		it('should convert characters enetered to lower case', () => {

			prefixTree.populate(dictionary);
			prefixTree.insert('PIZZ');
			expect(prefixTree.suggest('pizz')).to.deep.equal(['pizza', 'pizzeria', 'pizzicato', 'pizzle']);
		});
	});


	describe('Populate dictionary method unit testing', () => {

		it('should be a function', () => {

		expect(prefixTree.populate).to.be.a('function');
		});

		it('should populate a dictionary', () => {

			prefixTree.populate(dictionary);
			expect(prefixTree.wordCount).to.equal(234371);
		});
	});

	describe('Select method unit testing', () => {

		it('should be a function', () => {

		expect(prefixTree.select).to.be.a('function');
		});

		it('should increment word popularity every time a word is selected', () => {
			prefixTree.insert('cat');
			expect(prefixTree.root.children.c.children.a.children.t.popularity).to.equal(0);
			prefixTree.select('cat');
			expect(prefixTree.root.children.c.children.a.children.t.popularity).to.equal(1);
			prefixTree.select('cat');
			expect(prefixTree.root.children.c.children.a.children.t.popularity).to.equal(2);
		});
	});

});













