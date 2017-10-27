import { expect } from 'chai';
import Node from '../lib/Node';

describe('Node unit testing', () => {
  
  let node;

  it('should be a thing', () => {
    node = new Node('a');

    expect(node).to.exist;
  });

  it('should take an arguments for letter and wordEnd, assigning the arguments to data props', () => {
    node = new Node('a', 'b');

    expect(node.letter).to.equal('a', 'b');
  });

  it('should have a children which are an empty array ', () => {
    node = new Node();

    expect(node.children).to.deep.equal({});
  });

  it('should have popularity set to 0 by default', () => {
    node = new Node();

    expect(node.popularity).to.equal(0);
  });

});