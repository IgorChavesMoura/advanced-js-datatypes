'use strict';

const Event = require('events');

const event = new Event();

const eventName = 'counter';
event.on(eventName, msg => console.log('Counter updated', msg));

const myCounter = {

    counter: 0

};

const proxy = new Proxy(myCounter, {

    set: (target, propertyKey, newValue) => {

        event.emit(eventName, { newValue, key: target[propertyKey] });
        target[propertyKey] = newValue;
        return true;

    },

    get: (object, prop) => {

        //console.log('called!', { object, prop });

        return object[prop];

    }

});

setInterval(function () {

    proxy.counter += 1;

    if(proxy.counter === 10){

        clearInterval(this);

    }

}, 200);

//runs right now
setImmediate(() => {

    console.log('[1]: setimmediate', proxy.counter);

});

//runs right now, but it smashes node's lifecycle
process.nextTick(() => {

    proxy.counter = 2;
    
    console.log('[0]: nexttick');

});