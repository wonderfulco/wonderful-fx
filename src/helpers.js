import * as p from 'popsicle';

export class FixerIO {
    constructor(base, symbols) {
        if(base && Array.isArray(symbols)) {
            this.base = base;
            this.symbols = symbols;
        } else if(Array.isArray(base)) {
            this.base = 'USD';
            this.symbols = base;
        } else if(base && !symbols) {
            this.base = base;
            this.symbols = [];
        } else {
            this.base = 'USD';
            this.symbols = [];
        }
    }

    async getRates(date) {
        const q = {base: this.base};
        if(this.symbols.length > 0) {
            q.symbols = this.symbols.join();
        }

        return p.get({
            url: `http://api.fixer.io/${date || 'latest'}`,
            query: q
        }).use(p.plugins.parse('json'))
    }
}

import redis from 'redis';

export class Redis {
    constructor(host, port) {
        this.client = redis.createClient(port || 6379, host || 'localhost');
    }

    async set(date, rates) {
        return new Promise((resolve, reject) => {
            this.client.hmset(`rates:${date}`, rates, (err, result) => {
                if(err) {
                    reject(err);
                }
                resolve(result);
            })
        })
    }

    async get(date) {
        return new Promise((resolve, reject) => {
            this.client.hgetall(`rates:${date}`, (err, result) => {
                if(err) {
                    reject(err);
                }
                resolve(result);
            })
        })
    }
}