var expect = require('expect.js'),
    helpers = require('../helpers.js');

describe('helpers', function() {
    describe('camelCase', function() {
        it('should camelCase', function() {
            expect(helpers.camelCase(['some string', 'another string'])).to.eql(['someString', 'anotherString']);
        });

        it('should handle a single string', function() {
            expect(helpers.camelCase('some string')).to.equal('someString');
        });

        it('should remove special characters', function() {
            expect(helpers.camelCase('!question_#5')).to.equal('question_5');
        });
    });
});