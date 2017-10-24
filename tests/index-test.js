import { expect } from 'chai';
import index from '../lib/index.js';

import { bubbleSort, insertionSort, mergeSort, quickSort, createArray, checkArray} from '@PreciseSlice/sorting-suite';

describe('Import package testing', () => {
	it('should take in and utilize imported sorting suits', () => {
		expect(quickSort([3, 2, 1])).to.deep.equal([1, 2, 3]);
	});	
});