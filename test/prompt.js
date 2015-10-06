var expect = require('expect.js'),
    // stdout = require('test-console').stdout,
    mockStdout = require('./helpers.js').mockStdout,
    stdin = require('mock-stdin').stdin(),
    strip = require('strip-ansi'),
    prompt = require('../prompt.js');

describe('prompt', function() {
    describe('repeat', function() {
        it('should format the prompt and delimiter', function() {
            prompt.repeat({
                prompt: 'prompt',
                delimiter: '::',
                formatPrompt: function(pr, delim) {
                    return delim + pr + delim + ' ';
                }
            });


            var inspect = mockStdout();
            prompt.start();
            inspect.restore();

            var result = strip(inspect.output.join(''));
            expect(result).to.equal('::prompt:: ');
        });

        it('should call onLine with the result', function() {
            var res;
            var inspect = mockStdout();

            prompt.repeat({
                onLine: function(result) {
                    res = result;
                }
            });

            prompt.start();
            stdin.send('some string\n');
            inspect.restore();

            expect(res).to.equal('some string');
        });
    });

    describe('question', function() {
        it('should ask questions', function() {
            prompt.question(['First', 'Second']);

            var inspect = mockStdout();
            prompt.start();
            stdin.send('first string\n');
            inspect.restore();
            expect(strip(inspect.output.join(''))).to.equal('>: First: first string\r\n>: Second: ');
        });

        it('should get answers', function() {
            var res;

            prompt.question(['First question', 'Second'], {
                onComplete: function(result) {
                    res = result;
                }
            });


            var inspect = mockStdout();

            prompt.start();
            stdin.send('first string\n');
            stdin.send('second string\n');

            inspect.restore();

            expect(res.firstQuestion).to.equal('first string');
            expect(res.second).to.equal('second string');
        });
    });
});