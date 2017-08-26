# ember-cli-mentionable 
[![Build Status](https://travis-ci.org/yakmada/ember-cli-mentionable.svg?branch=master)](https://travis-ci.org/yakmada/ember-cli-mentionable) 
[![npm version](https://badge.fury.io/js/ember-cli-mentionable.svg)](https://badge.fury.io/js/ember-cli-mentionable)

An ember-cli addon allowing facebook style @mentions and #hashtags on inputs and textareas.

[demo](https://yakmada.github.io/ember-cli-mentionable/dist/)

## Installation

```
ember ember-cli-mentionable
```

## Usage

for examples and documentation, view the [demo](https://yakmada.github.io/ember-cli-mentionable/dist/)

```hbs
<!-- template -->
{{mentionable-input config=mentionableConfig value=foo}}
```

```javascript
// controller
mentionableConfig: {
  values: ['Johnny', 'Syd', 'Steve', 'Paul']
}
```

## To Do

* get `wait()` helper working for testing keyboard events
* maxResults to display in list
* smarter results matching (startsWith matches first)
* highlight matching string in list
* mentionable-contenteditable 

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`


For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
