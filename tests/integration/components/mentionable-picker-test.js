import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import { keyEvent } from 'ember-native-dom-helpers';

const DUMMY_DATA = ['foo', 'bar', 'baz'];

moduleForComponent('mentionable-picker', 'Integration | Component | mentionable picker', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{mentionable-picker}}`);

  assert.equal(this.$().text().trim(), '');
});

test('it renders results', function(assert) {
  this.set('results', DUMMY_DATA);
  this.render(hbs`
    {{mentionable-picker
      results=results
      showPicker=true
    }}
  `);

    assert.ok(this.$('ul').text().trim().includes('foo'));
    assert.ok(this.$('ul').text().trim().includes('bar'));
    assert.ok(this.$('ul').text().trim().includes('baz'));
});

test('it hides', function(assert) {
  this.set('results', DUMMY_DATA);
  this.render(hbs`
    {{mentionable-picker
      results=results
      showPicker=false
    }}
  `);
    assert.equal(this.$('ul').text().trim(), '');
});

test('it shows pending message', function(assert) {
  this.set('results', DUMMY_DATA);
  this.set('resultsPendingMessage', 'pending');
  this.render(hbs`
    {{mentionable-picker
      results=results
      showPicker=true
      resultsPending=true
      resultsPendingMessage=resultsPendingMessage
    }}
  `);
    assert.equal(this.$('ul').text().trim(), 'pending');
});

test('it shows no results message', function(assert) {
  this.set('results', []);
  this.set('noResultsMessage', 'no results');
  this.render(hbs`
    {{mentionable-picker
      results=results
      showPicker=true
      noResultsMessage=noResultsMessage
    }}
  `);
    assert.equal(this.$('ul').text().trim(), 'no results');
});

test('it sets results from click', function(assert) {
  this.set('results', DUMMY_DATA);
  this.set('selectedResult', null);
  this.render(hbs `
    {{mentionable-picker
      results=results
      showPicker=true
      selectedResult=selectedResult
    }}
  `);

  this.$('ul').focus();
  return wait().then(() => {
    assert.ok(this.$('ul').text().trim().includes('foo'));
    assert.ok(this.$('ul').text().trim().includes('bar'));
    assert.ok(this.$('ul').text().trim().includes('baz'));
    this.$('li').first().click();
    return wait().then(() => {
      assert.equal(this.get('selectedResult').trim(), 'foo');
    });
  });
});

test('it sets results from keyboard', function(assert) {
  this.set('results', DUMMY_DATA);
  this.set('selectedResult', null);
  this.render(hbs `
    {{mentionable-picker
      results=results
      showPicker=true
      selectedResult=selectedResult
    }}
  `);

  this.$('ul').focus();
  return wait().then(() => {
    assert.ok(this.$('ul').text().trim().includes('foo'));
    assert.ok(this.$('ul').text().trim().includes('bar'));
    assert.ok(this.$('ul').text().trim().includes('baz'));

    keyEvent('li', 'keydown', 13);
    return wait().then(() => {
      assert.equal(this.get('selectedResult').trim(), 'foo');
    });
  });
});

test('it sets navigates up from keyboard', function(assert) {
  this.set('results', DUMMY_DATA);
  this.set('selectedResult', null);
  this.render(hbs `
    {{mentionable-picker
      results=results
      showPicker=true
      selectedResult=selectedResult
      pickerClass="picker-sticker"
    }}
  `);

  this.$('.picker-sticker').focus();
  return wait().then(() => {
    assert.ok(this.$('ul').text().trim().includes('foo'));
    assert.ok(this.$('ul').text().trim().includes('bar'));
    assert.ok(this.$('ul').text().trim().includes('baz'));
    assert.equal(this.$('li.active').text(), 'foo');

    keyEvent('li.active', 'keydown', 38);
    return wait().then(() => {
      assert.equal(this.$('li.active').text(), 'baz');

      keyEvent('li.active', 'keydown', 38);
      return wait().then(() => {
        assert.equal(this.$('li.active').text(), 'bar');
      });
    });
  });
});

test('it sets navigates down from keyboard', function(assert) {
  this.set('results', DUMMY_DATA);
  this.set('selectedResult', null);
  this.render(hbs `
    {{mentionable-picker
      results=results
      showPicker=true
      selectedResult=selectedResult
      pickerClass="picker-sticker"
    }}
  `);

  this.$('.picker-sticker').focus();
  return wait().then(() => {
    assert.ok(this.$('ul').text().trim().includes('foo'));
    assert.ok(this.$('ul').text().trim().includes('bar'));
    assert.ok(this.$('ul').text().trim().includes('baz'));
    assert.equal(this.$('li.active').text(), 'foo');

    keyEvent('li.active', 'keydown', 40);
    return wait().then(() => {
      assert.equal(this.$('li.active').text(), 'bar');

      keyEvent('li.active', 'keydown', 40);
      return wait().then(() => {
        assert.equal(this.$('li.active').text(), 'baz');
      });
    });
  });
});
