import Ember from 'ember';

const {
  isPresent,
  computed
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
  inputSelector: 'input',
  inputClassNames: 'mentionable-input',
  debounceTime: 100,

  didReceiveAttrs() {
    this._super(...arguments);
    let mentionables = Ember.A([]);
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
    var promises = Ember.A([]);
    this.get('mentionables').map((mentionable) => {
      promises.addObject(this.parseMentionable(mentionable));
    })

    Ember.RSVP.all(promises).finally(() => {
      this.set('resultsPending', false);
    });
  },


  parseMentionable(mentionable) {
    return new Ember.RSVP.Promise((resolve) => {
      const text = `${this.get('value')}`;
      const match = text.match(mentionable.get('re'));
      if (match !== null) {
        const matchText = match[0].split(mentionable.get('key'))[1];
        this.set('match', matchText);
        this.searchData(matchText, mentionable).then((results) => {
          this.set('results', results);
          this.set('searchProperty', mentionable.get('searchProperty'));
        }).finally(() => {
          resolve();
        });
      } else {
        resolve();
      }
    });
  },

  searchData(text, mentionable) {
    return new Ember.RSVP.Promise((resolve /* , reject */) => {
      // Ember.run.later(this, function() {
      const values = mentionable.get('data');
      const searchProperty = mentionable.get('searchProperty');
      let results = Ember.A([]);
      if (text.length === 0) {
        results = values;
      } else {
        values.map((value) => {
          let searchValue = value;
          if (isPresent(searchProperty)) {
            searchValue = Ember.Object.create(value).get(searchProperty);
          }
          if (searchValue.toLowerCase().includes(text.toLowerCase())) {
            results.addObject(value);
          }
        });
      }
      resolve(results);
      // }, 1000);
    });
  },

  updateValue() {
    let selectedResult = this.get('selectedResult');
    let searchProperty = this.get('searchProperty');
    if (isPresent(searchProperty)) {
      selectedResult = Ember.Object.create(selectedResult).get(searchProperty);
    }
    const value = this.get('value').replace(this.get('match'), '');
    this.set('value', `${value}${selectedResult} `);
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
