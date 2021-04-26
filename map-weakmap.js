const assert = require('assert');

const myMap = new Map();

//it can have anything as key
myMap.set(1, 'one')
     .set('Igor Moura', { text: 'name' })
     .set(true, () => 'hello'); 


//using a constructor
const myMapWithConstructor = new Map([
    [1, 'one'],
    ['Igor Moura', { text: 'name' }],
    [true, () => 'hello']
]); 


assert.deepStrictEqual(myMap.get(1), 'one');
assert.deepStrictEqual(myMap.get('Igor Moura'), { text: 'name' });
assert.deepStrictEqual(myMap.get(true)(), 'hello');

//In objects the key can be only string or symbol (number is converted to string)
const onlyReferenceWorks = { id: 1 };

myMap.set(onlyReferenceWorks, { name: 'Igor Moura' });

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'Igor Moura' });

assert.deepStrictEqual(myMap.size, 4);

assert.deepStrictEqual(JSON.stringify([...myMap]), '[[1,"one"],["Igor Moura",{"text":"name"}],[true,null],[{"id":1},{"name":"Igor Moura"}]]');

for(const [key, value] of myMap){

    console.log({ key, value });

}

//Object is insecure because default behaviour can be overriden
//({ }).toString() === '[object Object]'
//({ toString: () => 'hey' }).toString() === 'hey'

// --- WeakMap

//it has most part of Map features, but it is not iterable
//Only reference keys that are already known

const weakMap = new WeakMap();

const hero = { name: 'Flash' };

// weakMap.set(hero);
// weakMap.get(hero);
// weakMap.delete(hero);
// weakMap.has(hero);