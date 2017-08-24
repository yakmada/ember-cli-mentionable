import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
// import { keyEvent } from 'ember-native-dom-helpers';

const DUMMY_VALUES = ['foo', 'bar', 'baz'];
const DUMMY_COMPLEX_VALUES = [
  {
    name: 'foo'
  },
  {
    name: 'bar'
  },
  {
    name: 'baz'
  }
];

moduleForComponent('mentionable-textarea', 'Integration | Component | mentionable textarea', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs `{{mentionable-textarea}}`);

  assert.equal(this.$('ul').text().trim(), '');

});

test('it renders picker results', function(assert) {
  const mentionableConfig = [{
    values: DUMMY_VALUES
  }];
  this.set('mentionableConfig', mentionableConfig)
  this.render(hbs `
    {{mentionable-textarea
      config=mentionableConfig
    }}
  `);

  this.$('textarea').val('@b').trigger('keyup');
  return wait().then(() => {
    assert.ok(this.$('ul').text().trim().includes('bar'));
    assert.ok(this.$('ul').text().trim().includes('baz'));
  });
});

test('it renders picker searchProperty results', function(assert) {
  const mentionableConfig = [{
    searchProperty: 'name',
    values: DUMMY_COMPLEX_VALUES
  }];
  this.set('mentionableConfig', mentionableConfig)
  this.render(hbs `
    {{mentionable-textarea
      config=mentionableConfig
    }}
  `);

  this.$('textarea').val('@b').trigger('keyup');
  return wait().then(() => {
    assert.ok(this.$('ul').text().trim().includes('bar'));
    assert.ok(this.$('ul').text().trim().includes('baz'));
  });
});

test('it renders no results found', function(assert) {
  const mentionableConfig = [{
    values: DUMMY_VALUES
  }];
  this.set('mentionableConfig', mentionableConfig)
  this.render(hbs `
    {{mentionable-textarea
      config=mentionableConfig
    }}
  `);

  this.$('textarea').val('@bo').trigger('keyup');
  return wait().then(() => {
    assert.ok(this.$('ul').text().trim().includes('no matching items'));
  });
});

test('it clears picker results', function(assert) {
  const mentionableConfig = [{
    values: DUMMY_VALUES
  }];
  this.set('mentionableConfig', mentionableConfig)
  this.render(hbs `
    {{mentionable-textarea
      config=mentionableConfig
    }}
  `);

  this.$('textarea').val('@f').trigger('keyup');
  return wait().then(() => {
    assert.ok(this.$('ul').text().trim().includes('foo'));
    this.$('textarea').val('xxx').trigger('keyup');
    return wait().then(() => {
      assert.equal(this.$('ul').text().trim(), '');
    });
  });
});


test('it sets results from click', function(assert) {
  const mentionableConfig = [{
    values: DUMMY_VALUES
  }];
  this.set('testValue', '');
  this.set('mentionableConfig', mentionableConfig)
  this.render(hbs `
    {{mentionable-textarea
      config=mentionableConfig
      value=testValue
    }}
  `);

  this.$('textarea').val('@b').trigger('keyup');
  return wait().then(() => {
    assert.ok(this.$('ul').text().trim().includes('bar'));
    assert.ok(this.$('ul').text().trim().includes('baz'));
    this.$('li').first().click();
    return wait().then(() => {
      assert.ok(this.$('textarea').val().trim().includes('bar'));
    });
  });
});

test('it sets searchProperty results from click', function(assert) {
  const mentionableConfig = [{
    searchProperty: 'name',
    values: DUMMY_COMPLEX_VALUES
  }];
  this.set('testValue', '');
  this.set('mentionableConfig', mentionableConfig)
  this.render(hbs `
    {{mentionable-textarea
      config=mentionableConfig
      value=testValue
    }}
  `);

  this.$('textarea').val('@b').trigger('keyup');
  return wait().then(() => {
    assert.ok(this.$('ul').text().trim().includes('bar'));
    assert.ok(this.$('ul').text().trim().includes('baz'));
    this.$('li').first().click();
    return wait().then(() => {
      const result = this.$('textarea').val().trim();
      assert.ok(
        result.includes('bar'),
        `${result} includes 'bar'`
      );
    });
  });
});

/* commenting out keyboard tests, as wait() is not waiting :( */

// test('it sets results from keyboard', function(assert) {
//   const mentionableConfig = [{
//     values: DUMMY_VALUES
//   }];
//   this.set('testValue', 'x');
//   this.set('mentionableConfig', mentionableConfig)
//   this.render(hbs `
//     {{mentionable-textarea
//       config=mentionableConfig
//       value=testValue
//     }}
//   `);

//   this.$('textarea').val('@b').trigger('keyup');
//   return wait().then(() => {
//     assert.ok(this.$('ul').text().trim().includes('bar'));
//     assert.ok(this.$('ul').text().trim().includes('baz'));

//     keyEvent('textarea', 'keyup', 38);
//     keyEvent('ul.mentionable-picker li', 'keydown', 13);
//     return wait().then(() => {
//       assert.equal(this.get('testValue').trim(), '@bar');
//     });
//   });
// });
