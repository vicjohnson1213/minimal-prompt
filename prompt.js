var readline = require('readline'),
    rl, opts, _prompt;

function repeat(newOpts) {
    reset();
    overrideOpts(newOpts || {});

    _prompt = function () {
        rl.question(opts.formatPrompt(opts.prompt, opts.delimiter), function(res) {
            opts.onLine(res);
            prompt();
        });
    };
}

function question(questions, newOpts) {
    reset();
    overrideOpts(newOpts || {});
    var results = {};

    _prompt = function() {

        // If there are any questions left, ask them.  Otherwise call onComplete
        // with the results.
        if (questions.length) {
            var name = questions.shift();

            rl.question(opts.formatPrompt(opts.prompt, opts.delimiter, name), function(res) {

                // Remove any invalid characters for variable names and camel case
                // the words in the question.
                var fixedName = name.replace(/[^A-Za-z_\d\s]/, '')
                    .split(/\s+/)
                    .map(function(el, idx) {
                        return idx !== 0 ?
                            el.charAt(0).toUpperCase() + el.slice(1) :
                            el.toLowerCase();
                    })
                    .join('');

                results[fixedName] = res;
                prompt();
            });
        } else {
            opts.onComplete(results);
        }
    }
}

function prompt() {
    _prompt();
}

function reset() {
    opts = {
        prompt: '>',
        delimiter: ':',
        formatPrompt: function(prompt, delim, name) {
            return prompt + delim + ' ' + (name ? name + delim + ' ' : '');
        },
        onLine: function(res) {
            console.log('Response:', res);
        },
        onComplete: function(results) {
            console.log(results);
            process.exit(0);
        }
    };

    if (rl) {
        rl.close();
        rl = null;
    }

    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('SIGINT', function() {
        console.log();
        process.exit(0);
    });
}

function overrideOpts(newOpts) {
    opts.prompt = newOpts.prompt !== undefined ? newOpts.prompt : opts.prompt;
    opts.delimiter = newOpts.delimiter !== undefined ? newOpts.delimiter : opts.delimiter;
    opts.formatPrompt = newOpts.formatPrompt || opts.formatPrompt;
    opts.onLine = newOpts.onLine || opts.onLine;
    opts.onComplete = newOpts.onComplete || opts.onComplete;
}

module.exports.repeat = repeat;
module.exports.question = question;
module.exports.start = prompt;
module.exports.reset = reset;