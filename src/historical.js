import {Base, Symbols, StartDate} from "../config";
import {FixerIO, Redis} from './helpers';
import moment from 'moment';

export default class {
    constructor() {
        this.fio = new FixerIO(Base, Symbols);
        this.r = new Redis();
    }

    async __main(date) {
        try {
            const response = await this.fio.getRates(date);
            return await this.r.set(date, response.body.rates);
        } catch (ex) {
            console.error(ex.stack);
        }
    }

    async populate() {
        return new Promise((resolve, reject) => {
            let d = moment(StartDate);

            let timer = setInterval(async () => {
                if(d.isAfter(moment())) {
                    clearInterval(timer);
                    resolve(true);
                } else {
                    const status = await this.__main(d.format('YYYY-MM-DD'));
                    if(status === 'OK') {
                        d.add(1, 'day');
                    } else {
                        reject(status);
                    }
                }
            }, 4000);
        });
    }
}
