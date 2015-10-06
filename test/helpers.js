function mockStdout() {
    var oldStdout = process.stdout.write;
    var output = [];

    process.stdout.write = function(string) {
        output.push(string);
    };

    return {
        output: output,
        restore: function() {
            process.stdout.write = oldStdout;
        }
    };
}

module.exports.mockStdout = mockStdout;