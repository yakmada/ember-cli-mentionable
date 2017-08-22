import Ember from 'ember';
import MentionableComponentMixin from 'ember-cli-mentionable/mixins/mentionable-component';
import { module, test } from 'qunit';

module('Unit | Mixin | mentionable component');

// Replace this with your real tests.
test('it works', function(assert) {
  let MentionableComponentObject = Ember.Object.extend(MentionableComponentMixin);
  let subject = MentionableComponentObject.create();
  assert.ok(subject);
});
