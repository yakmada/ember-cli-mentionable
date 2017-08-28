# ember-cli-mentionable 
[![Build Status](https://travis-ci.org/yakmada/ember-cli-mentionable.svg?branch=master)](https://travis-ci.org/yakmada/ember-cli-mentionable) 
[![npm version](https://badge.fury.io/js/ember-cli-mentionable.svg)](https://badge.fury.io/js/ember-cli-mentionable)

An ember-cli addon allowing facebook style @mentions and #hashtags on inputs and textareas.

### [demo](https://yakmada.github.io/ember-cli-mentionable/dist/)

![example screenshpt](https://yakmada.github.io/ember-cli-mentionable/public/images/ember-cli-mentionable-demo.png)


## Features

* written entirely in ember (no bower dependencies)
* highly configurable and override-able
* promise-based 
* no observers


## Installation

```
ember install ember-cli-mentionable
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

* highlight matching string in list
* mentionable-contenteditable 
* maxResults to display in list
* add the `searchValues` method to the mentionable config, so it cab be overriden globally or per config
* get `wait()` helper working for testing keyboard events



## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`


For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
