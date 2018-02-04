const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var res = isRealString(123);
        expect(res).toBeFalsy();
        expect(res).toBe(false);
        expect(res).toBeA('boolean');
    });

    it('should reject string with only spaces', () => {
        var res = isRealString(' ');
        expect(res).toBeFalsy();
        expect(res).toBe(false);
        expect(res).toBeA('boolean');
    });

    it('should allow string with non-space characters', () => {
        var res = isRealString('hello');
        expect(res).toBe(true);
        expect(res).toBeTruthy();
        expect(res).toBeA('boolean');
    });
});