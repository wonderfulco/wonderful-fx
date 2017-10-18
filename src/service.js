import Historical from './historical';

const h = new Historical();
h.populate().then(() => {
    console.log('seems to be done');
}).catch((ex) => {
    console.log('Something happened');
    console.error(ex);
});