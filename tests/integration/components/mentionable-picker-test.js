import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import sendEvent from '../../helpers/send-event';
import {
  DUMMY_VALUES
} from '../../helpers/test-data';

moduleForComponent('mentionable-picker', 'Integration | Component | mentionable picker', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{mentionable-picker}}`);

  assert.equal(this.$().text().trim(), '');
});

test('it renders matchingValues', function(assert) {
  this.set('matchingValues', DUMMY_VALUES);
  this.render(hbs`
    {{mentionable-picker
      matchingValues=matchingValues
      showPicker=true
    }}
  `);

  assert.ok(this.$('ul').text().trim().includes('foo'));
  assert.ok(this.$('ul').text().trim().includes('bar'));
  assert.ok(this.$('ul').text().trim().includes('baz'));
});

test('it hides', function(assert) {
  this.set('matchingValues', DUMMY_VALUES);
  this.render(hbs`
    {{mentionable-picker
      matchingValues=matchingValues
      showPicker=false
    }}
  `);
  assert.equal(this.$('ul').text().trim(), '');
});

test('it shows pending message', function(assert) {
  this.set('matchingValues', DUMMY_VALUES);
  this.set('matchingValuesPendingMessage', 'pending');
  this.render(hbs`
    {{mentionable-picker
      matchingValues=matchingValues
      showPicker=true
      matchingValuesPending=true
      matchingValuesPendingMessage=matchingValuesPendingMessage
    }}
  `);
  assert.equal(this.$('ul').text().trim(), 'pending');
});

test('it shows no matchingValues message', function(assert) {
  this.set('matchingValues', []);
  this.set('noMatchingValuesMessage', 'no matching items');
  this.render(hbs`
    {{mentionable-picker
      matchingValues=matchingValues
      showPicker=true
      noMatchingValuesMessage=noMatchingValuesMessage
    }}
  `);
  assert.equal(this.$('ul').text().trim(), 'no matching items');
});

test('it sets matchingValues from click', function(assert) {
  this.set('matchingValues', DUMMY_VALUES);
  this.set('selectedValue', null);
  this.render(hbs `
    {{mentionable-picker
      matchingValues=matchingValues
      showPicker=true
      selectedValue=selectedValue
    }}
  `);

  this.$('ul').focus();
  return wait().then(() => {
    assert.ok(this.$('ul').text().trim().includes('foo'));
    assert.ok(this.$('ul').text().trim().includes('bar'));
    assert.ok(this.$('ul').text().trim().includes('baz'));
    this.$('li').first().click();
    return wait().then(() => {
      assert.equal(this.get('selectedValue').trim(), 'foo');
    });
  });
});


/* commenting out keyboard tests, as wait() is not waiting :( */

test('it sets matchingValues from keyboard', function(assert) {
  this.set('matchingValues', DUMMY_VALUES);
  this.set('selectedValue', null);
  this.render(hbs `
    {{mentionable-picker
      matchingValues=matchingValues
      showPicker=true
      selectedValue=selectedValue
    }}
  `);

  this.$('ul').focus();
  return wait().then(() => {
    assert.ok(this.$('ul').text().trim().includes('foo'));
    assert.ok(this.$('ul').text().trim().includes('bar'));
    assert.ok(this.$('ul').text().trim().includes('baz'));

    sendEvent(this.$('li:eq(0)'), 'keydown', { keyCode: 13 });
    return wait().then(() => {
      assert.equal(this.get('selectedValue').trim(), 'foo');
    });
  });
});

test('it sets navigates up from keyboard', function(assert) {
  this.set('matchingValues', DUMMY_VALUES);
  this.set('selectedValue', null);
  this.render(hbs `
    {{mentionable-picker
      matchingValues=matchingValues
      showPicker=true
      selectedValue=selectedValue
      pickerClass="picker-sticker"
    }}
  `);

  this.$('.picker-sticker').focus();
  return wait().then(() => {
    assert.ok(this.$('ul').text().trim().includes('foo'));
    assert.ok(this.$('ul').text().trim().includes('bar'));
    assert.ok(this.$('ul').text().trim().includes('baz'));
    assert.equal(this.$('li.active').text().trim(), 'foo');

    const $li = this.$('li.active');
    sendEvent($li, 'keydown', { keyCode: 38 });
    return wait().then(() => {
      assert.equal(this.$('li.active').text().trim(), 'baz');

      sendEvent($li, 'keydown', { keyCode: 38 });
      return wait().then(() => {
        assert.equal(this.$('li.active').text().trim(), 'bar');
      });
    });
  });
});

test('it sets navigates down from keyboard', function(assert) {
  this.set('matchingValues', DUMMY_VALUES);
  this.set('selectedValue', null);
  this.render(hbs `
    {{mentionable-picker
      matchingValues=matchingValues
      showPicker=true
      selectedValue=selectedValue
      pickerClass="picker-sticker"
    }}
  `);

  this.$('.picker-sticker').focus();
  return wait().then(() => {
    assert.ok(this.$('ul').text().trim().includes('foo'));
    assert.ok(this.$('ul').text().trim().includes('bar'));
    assert.ok(this.$('ul').text().trim().includes('baz'));
    assert.equal(this.$('li.active').text().trim(), 'foo');

    const $li = this.$('li.active');
    sendEvent($li, 'keydown', { keyCode: 40 });
    return wait().then(() => {
      assert.equal(this.$('li.active').text().trim(), 'bar');

      sendEvent($li, 'keydown', { keyCode: 40 });
      return wait().then(() => {
        assert.equal(this.$('li.active').text().trim(), 'baz');
      });
    });
  });
});
