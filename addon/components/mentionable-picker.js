import Ember from 'ember';
import layout from '../templates/components/mentionable-picker';

const { isEmpty } = Ember;

const WRAPPER_CLASS = 'mentionable-picker-wrapper';

export default Ember.Component.extend({
  layout,
  classNames: [WRAPPER_CLASS],
  results: null,
  selectedResult: null,
  showPicker: null,
  actions: {
    didSelectResult(selectedResult) {
      this.selectResult(selectedResult);
    },
    didKeyUp(selectedResult, event) {
      this.handleKeyUp(selectedResult, event);
    }
  },

  handleKeyUp(selectedResult, event) {
      if (isEmpty(this.get('results'))) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      switch (event.keyCode) {
          case 38: // arrow up
            this.selectPrevious();
              break;
          case 40: // arrow down
            this.selectNext();
              break;
          case 13: // enter
            this.selectResult(selectedResult);
              break;
      }
  },

  selectPrevious() {
    const $active = this.$('.active')
    let $next = $active.prev('li');
    if ($next.length === 0) {
      $next = this.$('li').last();
    }
    $active.removeClass('active');
    $next.addClass('active').focus();
  },

  selectNext() {
    const $active = this.$('.active')
    let $next = $active.next('li');
    if ($next.length === 0) {
      $next = this.$('li').first();
    }
    $active.removeClass('active');
    $next.addClass('active').focus();
  },

  selectResult(selectedResult) {
      this.set('selectedResult', selectedResult);
      this.sendAction('didSelectResult');
  },

  focusIn(event) {
    if (Ember.$(event.target).hasClass(this.get('pickerClass'))) {
      this.selectNext();
    }
  }

});
