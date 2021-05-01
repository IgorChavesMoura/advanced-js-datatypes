const assert = require('assert');

const arr1 = ["0", "1", "2"];
const arr2 = ["2", "0", "3"];
 
const arr3 = arr1.concat(arr2);

assert.deepStrictEqual(arr3.sort(), [ '0', '0', '1', '2', '2', '3' ]);

const set = new Set();

arr1.forEach(item => set.add(item));
arr2.forEach(item => set.add(item));

assert.deepStrictEqual(Array.from(set), ['0', '1', '2', '3']);

assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), ['0', '1', '2', '3']);

assert.ok(set.has('3'));

//Sets doesn't has get, you can only know if it contains an item or not

const users01 = new Set([
    'igor',
    'erick',
    'maria',
    'xuxa'
]);

const users02 = new Set([
    'joaozim',
    'erick',
    'julio'
]);

const intersection = new Set([...users01].filter(user => users02.has(user)));

assert.deepStrictEqual(Array.from(intersection), ['erick']);

const difference = new Set([...users01].filter(user => !users02.has(user)));

assert.deepStrictEqual(Array.from(difference), ['igor', 'maria', 'xuxa']);

// --- weakSet

// Same idea as WeakMap
// It is not enumerable (iterable)
// Only works with keys as reference

const user = { id: 123 };
const user2 = { id: 321 };

const weakSet = new WeakSet([ user ]);

weakSet.add(user2);
weakSet.delete(user);
weakSet.has(user);