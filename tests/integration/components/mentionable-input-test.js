import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
// import { keyEvent } from 'ember-native-dom-helpers';

const DUMMY_VALUES = ['foo', 'bar', 'baz'];
const DUMMY_COMPLEX_VALUES = [{
    name: 'foo'
  },
  {
    name: 'bar'
  },
  {
    name: 'baz'
  }
];

const SORT_TEST_VALUES = ['tell', 'ask', 'say'];

moduleForComponent('mentionable-input', 'Integration | Component | mentionable input', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs `{{mentionable-input}}`);

  assert.equal(this.$('ul').text().trim(), '');

});

test('it renders picker results', function(assert) {
  const mentionableConfig = [{
    values: DUMMY_VALUES
  }];
  this.set('mentionableConfig', mentionableConfig)
  this.render(hbs `
    {{mentionable-input
      config=mentionableConfig
    }}
  `);

  this.$('input').val('@b').trigger('keyup');
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
    {{mentionable-input
      config=mentionableConfig
    }}
  `);

  this.$('input').val('@b').trigger('keyup');
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
    {{mentionable-input
      config=mentionableConfig
    }}
  `);

  this.$('input').val('@bo').trigger('keyup');
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
    {{mentionable-input
      config=mentionableConfig
    }}
  `);

  this.$('input').val('@f').trigger('keyup');
  return wait().then(() => {
    assert.ok(this.$('ul').text().trim().includes('foo'));
    this.$('input').val('xxx').trigger('keyup');
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
    {{mentionable-input
      config=mentionableConfig
      value=testValue
    }}
  `);

  this.$('input').val('@b').trigger('keyup');
  return wait().then(() => {
    assert.ok(this.$('ul').text().trim().includes('bar'));
    assert.ok(this.$('ul').text().trim().includes('baz'));
    this.$('li').first().click();
    return wait().then(() => {
      assert.ok(this.$('input').val().trim().includes('bar'));
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
    {{mentionable-input
      config=mentionableConfig
      value=testValue
    }}
  `);

  this.$('input').val('@b').trigger('keyup');
  return wait().then(() => {
    assert.ok(this.$('ul').text().trim().includes('bar'));
    assert.ok(this.$('ul').text().trim().includes('baz'));
    this.$('li').first().click();
    return wait().then(() => {
      const result = this.$('input').val().trim();
      assert.ok(
        result.includes('bar'),
        `${result} includes 'bar'`
      );
    });
  });
});


/*
  this test verifies an issue where the RegExp was improperly replacing the input value
  type: 'below the @b'
  select: 'bar'
  result: 'elow the @bbar'
 */
test('it correctly updates input', function(assert) {
  const mentionableConfig = [{
    values: DUMMY_VALUES
  }];
  this.set('testValue', '');
  this.set('mentionableConfig', mentionableConfig)
  this.render(hbs `
    {{mentionable-input
      config=mentionableConfig
      value=testValue
    }}
  `);

  this.$('input').val('below the @b').trigger('keyup');
  return wait().then(() => {
    assert.ok(this.$('ul').text().trim().includes('bar'));
    assert.ok(this.$('ul').text().trim().includes('baz'));
    this.$('li').first().click();
    return wait().then(() => {
      const result = this.$('input').val().trim();
      assert.equal(
        result,
        `below the @bar`
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
//     {{mentionable-input
//       config=mentionableConfig
//       value=testValue
//     }}
//   `);

//   this.$('input').val('@b').trigger('keyup');
//   return wait().then(() => {
//     assert.ok(this.$('ul').text().trim().includes('bar'));
//     assert.ok(this.$('ul').text().trim().includes('baz'));

//     keyEvent('input', 'keyup', 38);
//     keyEvent('ul.mentionable-picker li', 'keydown', 13);
//     return wait().then(() => {
//       assert.equal(this.get('testValue').trim(), '@bar');
//     });
//   });
// });

test('it renders sorted results', function(assert) {
  const mentionableConfig = [{
    values: SORT_TEST_VALUES
  }];
  this.set('mentionableConfig', mentionableConfig)
  this.render(hbs `
    {{mentionable-input
      config=mentionableConfig
    }}
  `);

  this.$('input').val('@').trigger('keyup');
  return wait().then(() => {
    const li0 = this.$('ul li:eq(0)').text().trim();
    assert.equal(li0, 'ask', `${li0} equals 'ask'`);
    const li1 = this.$('ul li:eq(1)').text().trim();
    assert.equal(li1, 'say', `${li1} equals 'say'`);
    const li2 = this.$('ul li:eq(2)').text().trim();
    assert.equal(li2, 'tell', `${li2} equals 'tell'`);
  });
});

test('it respects returnSortedMatches: false', function(assert) {
  const mentionableConfig = [{
    returnSortedMatches: false,
    values: SORT_TEST_VALUES
  }];
  this.set('mentionableConfig', mentionableConfig)
  this.render(hbs `
    {{mentionable-input
      config=mentionableConfig
    }}
  `);

  this.$('input').val('@').trigger('keyup');
  return wait().then(() => {
    const li0 = this.$('ul li:eq(0)').text().trim();
    assert.equal(li0, 'tell', `${li0} equals 'tell'`);
    const li1 = this.$('ul li:eq(1)').text().trim();
    assert.equal(li1, 'ask', `${li1} equals 'ask'`);
    const li2 = this.$('ul li:eq(2)').text().trim();
    assert.equal(li2, 'say', `${li2} equals 'say'`);
  });
});

test('it renders startsWith values before includes values results', function(assert) {
  const mentionableConfig = [{
    values: SORT_TEST_VALUES
  }];
  this.set('mentionableConfig', mentionableConfig)
  this.render(hbs `
    {{mentionable-input
      config=mentionableConfig
    }}
  `);

  this.$('input').val('@s').trigger('keyup');
  return wait().then(() => {
    const li0 = this.$('ul li:eq(0)').text().trim();
    assert.equal(li0, 'say', `${li0} equals 'say'`);
    const li1 = this.$('ul li:eq(1)').text().trim();
    assert.equal(li1, 'ask', `${li1} equals 'ask'`);
  });
});

test('it respects returnStartingMatchesFirst: false', function(assert) {
  const mentionableConfig = [{
    returnStartingMatchesFirst: false,
    values: SORT_TEST_VALUES
  }];
  this.set('mentionableConfig', mentionableConfig)
  this.render(hbs `
    {{mentionable-input
      config=mentionableConfig
    }}
  `);

  this.$('input').val('@s').trigger('keyup');
  return wait().then(() => {
    const li0 = this.$('ul li:eq(0)').text().trim();
    assert.equal(li0, 'ask', `${li0} equals 'ask'`);
    const li1 = this.$('ul li:eq(1)').text().trim();
    assert.equal(li1, 'say', `${li1} equals 'say'`);
  });
});
