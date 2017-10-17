import * as p from 'popsicle';

p.get('http://api.fixer.io/latest').then((response) => {
    console.log(response);
})