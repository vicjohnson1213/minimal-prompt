var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var opts = {
    prompt: '> ',
    onLine: function(res) {
        console.log('Response:', res);
    },
    onClose: function() {
    },
    onSIGINT: function() {
        process.exit(0);
    }
};

var _prompt;

function repeat(userOpts) {
    overrideOpts(userOpts);

    rl.on('close', function() {
        opts.onClose();
    });

    rl.on('SIGINT', function() {
        console.log();
        opts.SIGINT()
    });

    _prompt = function () {
        rl.question(opts.prompt + opts.delimiter, function(res) {
            opts.onLine(res);

            prompt();
        });
    };
}

function question(questions, newOpts) {
    newOpts.questions = questions;
    overrideOpts(newOpts);

    var results = {};

    _prompt = function() {
        if (opts.questions.length) {
            var name = opts.questions.shift();
            rl.question(opts.prompt + name + opts.delimiter, function(res) {
                var fixedName = name.replace(/[^A-Za-z_\d\s]/, '').split(/\s+/).map(function(el, idx) {
                    return idx !== 0 ?
                        el.charAt(0).toUpperCase() + el.slice(1) :
                        el.toLowerCase();
                }).join('');

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

function close() {
    rl.close();
}

function overrideOpts(newOpts) {
    opts.prompt = newOpts.prompt || opts.prompt;
    opts.delimiter = newOpts.delimiter || opts.delimiter;
    opts.onLine = newOpts.onLine || opts.onLine;
    opts.onClose = newOpts.onClose || opts.onClose;
    opts.onComplete = newOpts.onComplete || opts.onComplete;
    opts.onSIGINT = newOpts.onSIGINT || opts.onSIGINT;
    opts.questions = newOpts.questions || opts.questions;

}

module.exports.repeat = repeat;
module.exports.question = question;
module.exports.start = prompt;
module.exports.close = close;