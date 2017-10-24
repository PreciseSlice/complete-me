import { expect } from 'chai';
import Node from '../lib/Node';

describe('NODE', () => {
  let node;

  it('should be a thing', () => {
    node = new Node('a');

    expect(node).to.exist;
  });

  it('should take letter and assign it to data prop', () => {
    node = new Node('a');

    expect(node.letter).to.equal('a');
  });

});