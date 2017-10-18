import chai from 'chai';
import {FixerIO} from "../src/helpers";

const fio = new FixerIO('EUR');

describe("Test of FixerIO methods", function() {

    it('should return status === 200', async () => {
        const r = await fio.getRates('2000-01-03');
        chai.expect(r.status).to.equal(200);
    });

});