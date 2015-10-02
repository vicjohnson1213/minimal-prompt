var prompt = require('./prompt.js');

prompt({
    prompt: '>> ',
    onLine: function(res) {
        console.log('this is the shit:', res);
        if (res === 'poop') {
            prompt.close();
        }
    },
    onClose: function() {
        console.log('adios');
        process.exit(0);
    }
});

prompt.prompt();