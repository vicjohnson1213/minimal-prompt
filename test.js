var prompt = require('./prompt.js');

prompt.question(['Name number one', 'Other'], {
    prompt: '>> ',
    delimiter: ': ',
    // onLine: function(res) {
    //     console.log('this is the shit:', res);
    //     if (res === 'poop') {
    //         prompt.close();
    //     }
    // },
    onComplete: function(results) {
        console.log(results);
        prompt.close();
    },
    onSIGINT: function() {
        console.log();
        console.log('GOODBYE');
        process.exit(0);
    }
});

prompt.start();