import Ember from 'ember';

const {
  isPresent,
  computed
} = Ember;

const Mentionable = Ember.Object.extend({
  token: '@',
  re: null,
  values: []
});

export default Ember.Mixin.create({
  elementClassNames: null,
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
    didSelectValue() {
      this.updateValue();
      this.sendAction('didSelectValue');
    },
  },

  config: null,
  value: null,
  mentionables: null,
  inputSelector: 'input',
  inputClassNames: 'mentionable-input',
  debounceTime: 100,

  didReceiveAttrs() {
    this._super(...arguments);
    let mentionables = Ember.A([]);
    Ember.makeArray(this.get('config')).map((configItem) => {
      let mentionable = Mentionable.create(configItem);
      mentionable.set('re', new RegExp(`(^|\\W+)${mentionable.get('token')}\\w*$`, "gi"));
      mentionables.addObject(mentionable);
    });

    this.set('mentionables', mentionables);
  },

  parseMentionables() {
    this.set('matchingValues', null);
    this.set('matchingValuesPending', true);
    var promises = Ember.A([]);
    this.get('mentionables').map((mentionable) => {
      promises.addObject(this.parseMentionable(mentionable));
    })

    Ember.RSVP.all(promises).finally(() => {
      this.set('matchingValuesPending', false);
    });
  },


  parseMentionable(mentionable) {
    return new Ember.RSVP.Promise((resolve) => {
      const text = `${this.get('value')}`;
      const match = text.match(mentionable.get('re'));
      if (match !== null) {
        const matchText = match[0].split(mentionable.get('token'))[1];
        this.set('match', matchText);
        this.searchValues(matchText, mentionable).then((matchingValues) => {
          this.set('matchingValues', matchingValues);
          this.set('searchProperty', mentionable.get('searchProperty'));
        }).finally(() => {
          resolve();
        });
      } else {
        resolve();
      }
    });
  },

  searchValues(text, mentionable) {
    return new Ember.RSVP.Promise((resolve /* , reject */) => {
      // Ember.run.later(this, function() {
      const values = mentionable.get('values');
      const searchProperty = mentionable.get('searchProperty');
      let matchingValues = Ember.A([]);
      if (text.length === 0) {
        matchingValues = values;
      } else {
        values.map((value) => {
          let searchValue = value;
          if (isPresent(searchProperty)) {
            searchValue = Ember.Object.create(value).get(searchProperty);
          }
          if (searchValue.toLowerCase().includes(text.toLowerCase())) {
            matchingValues.addObject(value);
          }
        });
      }
      resolve(matchingValues);
      // }, 1000);
    });
  },

  updateValue() {
    let selectedValue = this.get('selectedValue');
    let searchProperty = this.get('searchProperty');
    if (isPresent(searchProperty)) {
      selectedValue = Ember.Object.create(selectedValue).get(searchProperty);
    }
    const value = this.get('value').replace(this.get('match'), '');
    this.set('value', `${value}${selectedValue} `);
    this.set('matchingValues', null);
    this.$(this.get('inputSelector')).focus();
  },

  /*
    properties for matchingValues
  */
  matchingValues: null,
  selectedValue: null,
  matchingValuesPending: null,
  showPicker: computed('matchingValues', 'matchingValuesPending', function() {
    return (this.get('matchingValues') !== null || this.get('matchingValuesPending') === true);
  }),
  pickerClass: 'mentionable-picker',
  noMatchingValuesMessage: 'no matching items found.',
  matchingValuesPendingMessage: 'loading...',
  pickerItemPartial: null,
  focusPicker(event) {
    if (
        (event.keyCode === 38 || event.keyCode === 40) &&
        isPresent(this.get('matchingValues'))
      )
    {
      this.$(`.${this.get('pickerClass')}`).focus();
    }
  }
});
