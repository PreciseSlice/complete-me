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

});