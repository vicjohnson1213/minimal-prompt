# Minimal Prompt

> A library for creating command-line interfaces and harvesting information from them.

### Installation

```bash
npm install minimal-prompt --save
```

### Usage

#### prompt.question(questions, options)

Used to prompt the user with a specific set of questions and get their answers to each one.

**Arguments**

1. `array` *(array)*: The set of questions to prompt the user with.
2. `options` *(object)*: An object describing the behavior of the prompt.

**Options**

1. `prompt` *(string)*: A string to begin each input line with.
2. `delimiter` *(string)*: A string to separate the prompt from the user input.
3. `onComplete` *(function)*: The function invoked when all questions are complete.
4. `onClose` *(function)*: The function invoked when the command-line is closed.
5. `onSIGINT` *(function)*: The function invoked when Ctrl-C is pressed.
6. `formatPrompt` *(function)*: A function to format the prompt.
    - `formatPrompt(prompt, delimiter, name)`
        1. `prompt` *(string)*: The specified prompt string.
        2. `delimiter` *(string)*: The specified delimter string.
        3. `name` *(string)*: If using a `question` prompt, the question being asked. (Only available for a question prompt)

**Example**

```javascript
prompt.question(['First Name', 'Last Name'], {
    prompt: '>',
    delimiter: ':',
    formatPrompt: function(prompt, delim, name) {
        // Note: this is the default prompt.
        return prompt + delim + ' ' + name + delim + ' ';
    },
    onComplete: function(results) {
        console.log('First name:', results.firstName);
        console.log('Last name:', results.lastName);
    }
});
```