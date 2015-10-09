function camelCase(arr) {
    if (typeof arr === 'string') {
        return camelCaseString(arr);
    }

    // Remove any invalid characters for variable names and camel case
    // the words in the question.
    return arr.map(function(string) {
        return camelCaseString(string);
    });

    function camelCaseString(string) {
        return string.replace(/[^A-Za-z_\d\s]/g, '')
            .split(/\s+/)
            .map(function(el, idx) {
                return idx !== 0 ?
                    el.charAt(0).toUpperCase() + el.slice(1) :
                    el.toLowerCase();
            })
            .join('');
    }
}

module.exports.camelCase = camelCase;