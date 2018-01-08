import fs from 'fs';
import { expect } from 'chai';
import prefixTrie from '../lib/Trie.js';
import Node from '../lib/Node.js';

const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

let prefixTrie;
let node;

beforeEach(() => {
	prefixTrie = new prefixTrie();
	node = new Node('');
});
 
describe('prefixTrie unit testing', () => {

	it('should create a prefixTrie object', () => {
 		expect(prefixTrie).to.be.an('object');
  });


  it('should have a node as the root', () => {
  	expect(prefixTrie.root).to.deep.equal(node);
	});

	it('should have a property of word count set to 0', () => {
		expect(prefixTrie.wordCount).to.equal(0);
	});

});

describe('Insert method unit testing', () => {

	it('should be a method', () => {
		expect(prefixTrie.insert).to.be.a('function');
	});


	it('Should be able to take in a word', () => {
		prefixTrie.insert('pizza');
		expect(
			prefixTrie.root.children
			.p.children
			.i.children
			.z.children
			.z.children
			.a.letter).to.equal('a');
	});

	it('Should be able to take in multiple words', () => {
		prefixTrie.insert('pizza');
		expect(
			prefixTrie.root.children
			.p.children
			.i.children
			.z.children
			.z.children
			.a.letter).to.equal('a');

		prefixTrie.insert('dog');
		expect(
			prefixTrie.root.children
			.d.children
			.o.children
			.g.letter).to.equal('g');
		});
	
	it('should convert characters enetered to lower case', () => {
	  let prefixTrie = new prefixTrie();

		prefixTrie.populate(dictionary);
		prefixTrie.insert('PIZZ');
		expect(prefixTrie.suggest('pizz')).to.deep.equal(['pizza', 'pizzeria', 'pizzicato', 'pizzle']);
	});

	it('should switch the node word end property to true once the end of a word is reached' , () => {

		prefixTrie.insert('pizza');
		expect(
			prefixTrie.root.children
			.p.children
			.i.children
			.z.children
			.z.children
			.a.wordEnd).to.equal(true);
	});

});


describe('Count unit testing', () => {

	it('should keep a count of how many words have been inserted', () => {
		let prefixTrie = new prefixTrie();

		expect(prefixTrie.wordCount).to.equal(0);
		prefixTrie.insert('cat');
		expect(prefixTrie.wordCount).to.equal(1);
			
		prefixTrie.insert('dog');
		expect(prefixTrie.wordCount).to.equal(2);
			
		prefixTrie.insert('bird');
		expect(prefixTrie.wordCount).to.equal(3);
	});

	it('should not add the same word twice to the tree', () => {
		let	prefixTrie = new prefixTrie();

		expect(prefixTrie.wordCount).to.equal(0);
		prefixTrie.insert('pizza');
		expect(prefixTrie.wordCount).to.equal(1);

		prefixTrie.insert('pizza');
		expect(prefixTrie.wordCount).to.equal(1);
	});

});


describe('Suggest method unit testing', () => {

	it('should be a function', () => {
		expect(prefixTrie.suggest).to.be.a('function');
	});

	it('should return an array', () => {
		expect(prefixTrie.suggest('')).to.be.an('array');
	});

	it('should not suggest anything if the word does not exist', () => {
		prefixTrie.insert('dhgfs');
		expect(prefixTrie.suggest('dhgfs')).to.deep.equal([]);
	});

	it('should convert characters enetered to lower case', () => {
		prefixTrie.populate(dictionary);
		prefixTrie.insert('PIZZ');
		expect(prefixTrie.suggest('pizz')).to.deep.equal(['pizza', 'pizzeria', 'pizzicato', 'pizzle']);
	});

	it('should return all complete words if suggesting an empty string', () => {

		prefixTrie.insert('cat');
		prefixTrie.insert('dog');
		prefixTrie.insert('snake');

		expect(prefixTrie.suggest('')).to.deep.equal(['cat', 'dog', 'snake']);
	});

});


describe('Select method unit testing', () => {
	
	it('should be a function', () => {
		
		expect(prefixTrie.select).to.be.a('function');
	});
	
	it('should increment word popularity every time a word is selected', () => {
		
		prefixTrie.insert('cat');
		expect(prefixTrie.root.children.c.children.a.children.t.popularity).to.equal(0);
		prefixTrie.select('cat');
		expect(prefixTrie.root.children.c.children.a.children.t.popularity).to.equal(1);
		prefixTrie.select('cat');
		expect(prefixTrie.root.children.c.children.a.children.t.popularity).to.equal(2);
	});
	
	it('should effect the order of the suggestions array', () => {
		
		prefixTrie.insert('cat');
		prefixTrie.insert('dog');
		expect(prefixTrie.suggest('')).to.deep.equal(['cat', 'dog']);
		prefixTrie.select('dog');
		expect(prefixTrie.suggest('')).to.deep.equal(['dog', 'cat']);
	});
});

describe('Populate dictionary method unit testing', () => {

	it('should be a function', () => {
		expect(prefixTrie.populate).to.be.a('function');
	});

	it('should populate a dictionary', () => {
		prefixTrie.populate(dictionary);
		expect(prefixTrie.wordCount).to.equal(234371);
	});

});

describe('delete', () => {
    
	it('should be an method', () => {
		expect(prefixTrie.delete).to.be.a('function');
	});

	it('should not suggest a word deleted from suggested words', () => {
		prefixTrie.insert('cat');
		prefixTrie.insert('cats');
		prefixTrie.insert('catch');
		prefixTrie.insert('catheter');
		prefixTrie.insert('catatonic');

		expect(prefixTrie.suggest('ca')).to.deep.equal(['cat', 'cats', 'catch', 'catheter', 'catatonic']);

		prefixTrie.delete('cat');
		expect(prefixTrie.suggest('ca')).to.deep.equal(['cats', 'catch', 'catheter', 'catatonic']);
	});

	it('should not suggest any deleted words', () => {
		prefixTrie.insert('cat');
		prefixTrie.insert('cats');
		prefixTrie.insert('catch');
		prefixTrie.insert('catheter');
		prefixTrie.insert('catatonic');

		expect(prefixTrie.suggest('ca')).to.deep.equal(['cat', 'cats', 'catch', 'catheter', 'catatonic']);
		
		prefixTrie.delete('cat');
		expect(prefixTrie.suggest('ca')).to.deep.equal(['cats', 'catch', 'catheter', 'catatonic']);

		prefixTrie.delete('catch');
		expect(prefixTrie.suggest('ca')).to.deep.equal(['cats', 'catheter', 'catatonic']);
		
		prefixTrie.delete('catheter');
		expect(prefixTrie.suggest('ca')).to.deep.equal(['cats', 'catatonic']);
	});

	it('Should not suggest a deleted word from the dictionary', () => {
		prefixTrie.populate(dictionary);

		prefixTrie.delete('pizza');
		expect(prefixTrie.suggest('pizza')).to.not.include.members(['pizza']);
	});

	it('Should not suggest any deleted words from the dictionary', () => {
		prefixTrie.populate(dictionary);

		prefixTrie.delete('pizza');
		expect(prefixTrie.suggest('pizza')).to.not.include.members(['pizza']);

		prefixTrie.delete('pizzle');
		expect(prefixTrie.suggest('pizza', 'pizzle')).to.not.include.members(['pizza', 'pizzle']);

		prefixTrie.delete('attention');
		expect(prefixTrie.suggest('pizza', 'pizzle', 'attention')).to.not.include.members(['pizza', 'pizzle', 'attention']);
	});

});