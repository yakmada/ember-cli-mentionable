import Ember from 'ember';

const {
  isPresent,
  computed,
  computed: { alias }
} = Ember;

const Mentionable = Ember.Object.extend({
  key: '@',
  re: null,
  data: []
});

export default Ember.Mixin.create({
  elementClassNames: null,
  type: 'text',
  actions: {
    didFocusIn() {
      this.sendAction('didFocusIn');
    },
    didFocusOut() {
      this.sendAction('didFocusOut');
    },
    didKeyPress() {
      this.sendAction('didKeyPress');
    },
    didInsertNewline() {
      this.sendAction('didInsertNewline');
    },
    didPressEnter() {
      this.sendAction('didPressEnter');
    },
    didPressEscape() {
      this.sendAction('didPressEscape');
    },
    didKeyUp(value, event) {
      this.sendAction('didKeyUp');
      this.focusPicker(event);
      if (event.keyCode !== 38 && event.keyCode !== 40 && event.keyCode !== 13) {
        Ember.run.debounce(this, this.parseMentionables, this.get('debounceTime'));
      }
    },
    didSelectResult() {
      this.updateValue();
      this.sendAction('didSelectResult');
    },
  },

  data: null,
  value: null,
  mentionables: null,
  renderValue: alias('value'),
  inputSelector: 'input',
  inputClassNames: 'mentionable-input',
  debounceTime: 100,

  didReceiveAttrs() {
    this._super(...arguments);
    let mentionables = [];
    Ember.makeArray(this.get('data')).map((dataItem) => {
      let mentionable = Mentionable.create(dataItem);
      mentionable.set('re', new RegExp(`(^|\\W+)${mentionable.get('key')}\\w*$`, "gi"));
      mentionables.addObject(mentionable);
    });

    this.set('mentionables', mentionables);
  },

  parseMentionables() {
    this.set('results', null);
    this.set('resultsPending', true);
    var promises = [];
    this.get('mentionables').map((mentionable) => {
      promises.addObject(this.parseMentionable(mentionable));
    })

    Ember.RSVP.all(promises).finally(() => {
      this.set('resultsPending', false);
    });
  },


  parseMentionable(mentionable) {
    return new Ember.RSVP.Promise((resolve) => {
      const text = `${this.get('renderValue')}`;
      const match = text.match(mentionable.get('re'));
      if (match !== null) {
        const matchText = match[0].split(mentionable.get('key'))[1];
        this.set('match', matchText);
        this.searchData(matchText, mentionable.get('data')).then((results) => {
          this.set('results', results);
        }).finally(() => {
          resolve();
        });
      } else {
        resolve();
      }
    });
  },

  searchData(text, data) {
    return new Ember.RSVP.Promise((resolve /* , reject */) => {
      // Ember.run.later(this, function() {
      let results = [];
      if (text.length === 0) {
        results = data;
      } else {
        data.map(value => {
          if (value.toLowerCase().includes(text.toLowerCase())) {
            results.push(value);
          }
        });
      }
      resolve(results);
      // }, 1000);
    });
  },

  updateValue() {
    // console.log('match', this.get('match'));
    const value = this.get('renderValue').replace(this.get('match'), '');
    this.set('renderValue', `${value}${this.get('selectedResult')} `);
    this.set('results', null);
    this.$(this.get('inputSelector')).focus();
  },

  /*
    properties for results
  */
  results: null,
  selectedResult: null,
  resultsPending: null,
  showPicker: computed('results', 'resultsPending', function() {
    return (this.get('results') !== null || this.get('resultsPending') === true);
  }),
  pickerClass: 'mentionable-picker',
  noResultsMessage: 'no results found.',
  resultsPendingMessage: 'loading...',
  focusPicker(event) {
    if (
        (event.keyCode === 38 || event.keyCode === 40) &&
        isPresent(this.get('results'))
      )
    {
      this.$(`.${this.get('pickerClass')}`).focus();
    }
  }
});
