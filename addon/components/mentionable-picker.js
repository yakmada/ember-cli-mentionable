import Ember from 'ember';
import layout from '../templates/components/mentionable-picker';

const { isEmpty } = Ember;

const WRAPPER_CLASS = 'mentionable-picker-wrapper';

export default Ember.Component.extend({
  layout,
  classNames: [WRAPPER_CLASS],
  matchingValues: null,
  selectedValue: null,
  showPicker: null,
  actions: {
    didSelectValue(selectedValue) {
      this.selectValue(selectedValue);
    },
    didKeyDown(selectedValue, event) {
      this.handleKeyDown(selectedValue, event);
    }
  },

  handleKeyDown(selectedValue, event) {
    if (isEmpty(this.get('matchingValues'))) {
      return;
    }
    event.preventDefault();
    switch (event.keyCode) {
      case 38: // arrow up
        this.selectPrevious();
        break;
      case 40: // arrow down
        this.selectNext();
        break;
      case 13: // enter
        this.selectValue(selectedValue);
        this.sendAction('didPressEnter'); // eslint-disable-line ember/closure-actions
        break;
      case 27: // escape
        this.sendAction('focusInput'); // eslint-disable-line ember/closure-actions
        this.sendAction('didPressEscape'); // eslint-disable-line ember/closure-actions
        break;
      default:
        this.$('.active').removeClass('active');
        this.sendAction('updateKeypress', event); // eslint-disable-line ember/closure-actions
        break;
    }
  },

  selectPrevious() {
    const $active = this.$('.active');
    let $next = $active.prev('li');
    if ($next.length === 0) {
      $next = this.$('li').last();
    }
    $active.removeClass('active');
    $next.addClass('active').focus();
  },

  selectNext() {
    const $active = this.$('.active');
    let $next = $active.next('li');
    if ($next.length === 0) {
      $next = this.$('li').first();
    }
    $active.removeClass('active');
    $next.addClass('active').focus();
  },

  selectValue(selectedValue) {
    this.set('selectedValue', selectedValue);
    this.sendAction('didSelectValue'); // eslint-disable-line ember/closure-actions
  },

  focusIn(event) {
    if (Ember.$(event.target).hasClass(this.get('pickerClass'))) {
      this.selectNext();
    }
  }

});
