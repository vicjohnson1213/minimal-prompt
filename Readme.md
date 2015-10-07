# Minimal Prompt

[![Build Status](https://travis-ci.org/vicjohnson1213/minimal-prompt.svg)](https://travis-ci.org/vicjohnson1213/minimal-prompt)

> A library for creating command-line interfaces and harvesting information from them.

## Installation

```bash
npm install minimal-prompt --save
```

## Usage

### prompt.question(questions, options)

Used to prompt the user with a specific set of questions and get their answers to each one.

**Arguments**

1. `questions` *(array)*: The set of questions to prompt the user with.
2. `options` *(object)*: An object describing the behavior of the prompt.

**Options**

1. `prompt` *(string)*: A string to begin each input line with.
2. `delimiter` *(string)*: A string to separate the prompt from the user input.
3. `onComplete` *(function)*: The function invoked when all questions are complete.
4. `formatPrompt` *(function)*: A function to format the prompt.
    - `formatPrompt(prompt, delimiter, name)`
        1. `prompt` *(string)*: The specified prompt string.
        2. `delimiter` *(string)*: The specified delimter string.
        3. `name` *(string)*: If using a `question` prompt, the question being asked. (Only available for a question prompt)

**Example**

```javascript
var prompt = require('minimal-prompt');

prompt.question(['First Name', 'Last Name'], {
    prompt: '>',
    delimiter: ':',
    formatPrompt: function(prompt, delim, name) {
        // Note: this is the default prompt for the question option.
        return prompt + delim + ' ' + name + delim + ' ';
    },
    onComplete: function(results) {
        console.log('First name:', results.firstName);
        console.log('Last name:', results.lastName);
    }
});

// prompt.start() will begin the prompting process.
prompt.start();
```

### prompt.repeat(options)

Used to repeatedly prompt the user for information using the same prompt.

**Arguments**

1. `options` *(object)*: An object describing the behavior of the prompt.

**Options**

1. `prompt` *(string)*: A string to begin each input line with.
2. `delimiter` *(string)*: A string to separate the prompt from the user input.
3. `onLine` *(function)*: The function invoked when a new line of input is ready.
4. `formatPrompt` *(function)*: A function to format the prompt.
    - `formatPrompt(prompt, delimiter)`
        1. `prompt` *(string)*: The specified prompt string.
        2. `delimiter` *(string)*: The specified delimter string.

**Example**

```javascript
var prompt = require('minimal-prompt');

prompt.repeat({
    prompt: '>',
    delimiter: ':',
    formatPrompt: function(prompt, delim, name) {
        // Note: this is the default prompt for the repeat option.
        return prompt + delim + ' ';
    },
    onLine: function(results) {
        console.log('Response:', res);
    }
});

// prompt.start() will begin the prompting process.
prompt.start();
```