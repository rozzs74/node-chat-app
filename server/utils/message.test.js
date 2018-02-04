const expect = require('expect');

var { generateMessage } = require('./message');

describe('GENERATE MESSAGE', () => {
    it('Should generate correct message object', () => {
        var from = 'Royce';
        var text = 'hello';
        var res = generateMessage(from, text);
        var createdAt = res.createdAt;

        expect(res).toInclude({ from, text, createdAt });
        expect(res.createdAt).toBeA('number');
    });
});