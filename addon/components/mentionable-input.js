import Ember from 'ember';
import mentionableComponent from '../mixins/mentionable-component';
import layout from '../templates/components/mentionable-input';


export default Ember.Component.extend(mentionableComponent, {
  layout,
  type: 'text',
  classNames: ['mentionable-component', 'mentionable-input']
});
