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
        process.exit(0);
    }
}

rl.on('SIGINT', function() {
    opts.onClose();
    process.exit(0);
});

function setupPrompt(userOpts) {
    opts.prompt = userOpts.prompt || opts.prompt;
    opts.onLine = userOpts.onLine || opts.onLine;
    opts.onClose = userOpts.onClose || opts.onClose;

    rl.on('close', function() {
        opts.onClose();
    });
}

function prompt() {
    rl.question(opts.prompt, function(res) {
        opts.onLine(res);

        prompt();
    });
}

function close() {
    rl.close();
}

module.exports = setupPrompt;
module.exports.prompt = prompt;
module.exports.close = close;