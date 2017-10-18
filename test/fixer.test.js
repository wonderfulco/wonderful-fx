import chai from 'chai';
import {FixerIO} from "../src/helpers";

describe("FixerIO class", function() {

    it('should accept base currencies', () => {
        const fio = new FixerIO('USD');
        chai.expect(fio.base).to.equal('USD');
    });

    it('should accept symbols', () => {
        const fio = new FixerIO(['USD', 'CAD', 'GBP']);
        chai.expect(fio.symbols).to.deep.equal(['USD', 'CAD', 'GBP']);
    });

    it('should accept base currencies and symbols', () => {
       const fio = new FixerIO('USD', ['CAD', 'GBP', 'EUR']);
       chai.expect(fio).to.include({base: 'USD'}).and
           .have.property('symbols').deep.equal(['CAD', 'GBP', 'EUR']);
    });

    it('should form a good request', async () => {
        const fio = new FixerIO();
        const r = await fio.getRates('2000-01-03');
        chai.expect(r.status).to.equal(200);
    });

    it('should return correct object for no args', async () => {
        const fio = new FixerIO();
        const obj = {
            "base": "USD",
            "date": "2000-01-03",
            "rates": {
                "AUD": 1.5209,
                "CAD": 1.4447,
                "CHF": 1.59,
                "CYP": 0.57156,
                "CZK": 35.741,
                "DKK": 7.374,
                "EEK": 15.507,
                "GBP": 0.61903,
                "HKD": 7.7923,
                "HUF": 252.26,
                "ISK": 72.379,
                "JPY": 101.83,
                "KRW": 1129.8,
                "LTL": 4.0093,
                "LVL": 0.58632,
                "MTL": 0.4114,
                "NOK": 7.9901,
                "NZD": 1.9159,
                "PLN": 4.1462,
                "ROL": 18110,
                "SEK": 8.4757,
                "SGD": 1.6619,
                "SIT": 197.12,
                "SKK": 41.94,
                "TRL": 541260,
                "ZAR": 6.146,
                "EUR": 0.99108
            }
        };
        const r = await fio.getRates('2000-01-03');
        chai.expect(r.body).to.deep.equal(obj);
    });

    it('should return correct object for only base args', async () => {
        const fio = new FixerIO('EUR');
        const obj = {
            "base": "EUR",
            "date": "2000-01-03",
            "rates": {
                "AUD": 1.5346,
                "CAD": 1.4577,
                "CHF": 1.6043,
                "CYP": 0.5767,
                "CZK": 36.063,
                "DKK": 7.4404,
                "EEK": 15.647,
                "GBP": 0.6246,
                "HKD": 7.8624,
                "HUF": 254.53,
                "ISK": 73.03,
                "JPY": 102.75,
                "KRW": 1140,
                "LTL": 4.0454,
                "LVL": 0.5916,
                "MTL": 0.4151,
                "NOK": 8.062,
                "NZD": 1.9331,
                "PLN": 4.1835,
                "ROL": 18273,
                "SEK": 8.552,
                "SGD": 1.6769,
                "SIT": 198.89,
                "SKK": 42.317,
                "TRL": 546130,
                "USD": 1.009,
                "ZAR": 6.2013
            }
        };
        const r = await fio.getRates('2000-01-03');
        chai.expect(r.body).to.deep.equal(obj);
    });

    it('should return correct object for only symbol args', async () => {
        const fio = new FixerIO(['CAD', 'GBP']);
        const obj = {
            "base": "USD",
            "date": "2000-01-03",
            "rates": {
                "CAD": 1.4447,
                "GBP": 0.61903
            }
        };
        const r = await fio.getRates('2000-01-03');
        chai.expect(r.body).to.deep.equal(obj);
    });

    it('should return correct object for both args', async () => {
        const fio = new FixerIO('EUR', ['CAD', 'GBP']);
        const obj = {
            "base": "EUR",
            "date": "2000-01-03",
            "rates": {
                "CAD": 1.4577,
                "GBP": 0.6246
            }
        };
        const r = await fio.getRates('2000-01-03');
        chai.expect(r.body).to.deep.equal(obj);
    });
});