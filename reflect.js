'use strict'

const assert = require('assert');

// --- apply

const myObj = {

    add(myValue){

        return this.arg1 + this.arg2 + myValue;

    }

};

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130);

//a problem that may happen (uncommon)
//Function.prototype.apply = () => { throw new TypeError('Oops') };

//this one may happen as well
myObj.add.apply = function () { throw new TypeError('wow') };

assert.throws(() => myObj.add.apply({}, []), { name:'TypeError', message:'wow' });

//Using reflect:
const result = Reflect.apply(myObj.add, { arg1: 100, arg2:20 }, [10]);

assert.deepStrictEqual(result, 130);
// --- apply

// --- defineProperty

function MyDate() {}

//Ugly as hell
Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey' });

//Makes much more sense
Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'Hey with reflection' });

assert.deepStrictEqual(MyDate.withObject(), 'Hey');
assert.deepStrictEqual(MyDate.withReflection(), 'Hey with reflection');
// --- defineProperty

// --- deleteProperty
const withDelete = { user:'IgorMoura' };

//Bad performance, avoid using this one
delete withDelete.user;

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false);

const withReflection = { user:'Xuxa' };

Reflect.deleteProperty(withReflection, 'user');

assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false);
// --- deleteProperty

// --- get

//We should be able to make a get only on reference instances
assert.deepStrictEqual(1['userName'], undefined);

//Using reflection, a exception is thrown
assert.throws(() => Reflect.get(1, "userName"), TypeError);
// --- get

// --- has
assert.ok('superman' in { superman:'' });
assert.ok(Reflect.has({ batman:'' }, 'batman'));
// --- has

// --- ownKeys
const user = Symbol('user');

const anotherObj = {

    id: 1,
    [Symbol.for("password")]: 123,
    [user]: 'igorMoura'

};

const objectKeys = [ ...Object.getOwnPropertyNames(anotherObj), ...Object.getOwnPropertySymbols(anotherObj) ];

assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user]);

//using reflection, only one call
assert.deepStrictEqual(Reflect.ownKeys(anotherObj), ['id', Symbol.for('password'), user]);