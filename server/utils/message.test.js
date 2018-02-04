const expect = require('expect');

var { generateMessage, generateLocationMessage } = require('./message');

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

describe('GENERATE LOCATION MESSAGE', () => {
    it('Should generate location message object', () => {
        var from = 'Admin';
        var latitude = 1;
        var longitude = 2;
        var url = `https://www.google.com/maps?q=1,2`;
        var res = generateLocationMessage(from, latitude, longitude);
        
        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({
            from,
            url
        });
        expect(res.url).toBe(url);
    });
});