import Ember from 'ember';
import demoUsers from '../constants/demo-users';
import demoBuzzwords from '../constants/demo-buzzwords';

export default Ember.Controller.extend({
  // BEGIN-SNIPPET mentionableConfig1
  mentionableConfig: {
    values: ['Johnny', 'Syd', 'Steve', 'Stuart', 'Stephanie', 'Stacy', 'Paul']
  },
  // END-SNIPPET

  // BEGIN-SNIPPET mentionableConfig2
  hashtagConfig: {
    token: '#',
    values: ['noAmpersand', 'atSucks', 'poundThis', 'hashBrowns']
  },
  // END-SNIPPET

  // BEGIN-SNIPPET mentionableConfig3
  mixedConfig: [
    {
      values: ['Johnny', 'Syd', 'Steve', 'Paul']
    },
    {
      token: '#',
      values: ['noAmpersand', 'atSucks', 'poundThis', 'hashBrowns']
    }
  ],
  // END-SNIPPET

  // BEGIN-SNIPPET mentionableConfig4
  complexConfig: {
    searchProperty: 'name',
    values: [
      { id: '1', name: 'Alfred' },
      { id: '2', name: 'Martin' },
      { id: '3', name: 'Norman' },
      { id: '4', name: 'Ike' }
    ]
  },
  // END-SNIPPET

  // BEGIN-SNIPPET mentionableConfig5
  asyncConfig: {
    searchProperty: 'name',
    values: []
  },

  someAsynchRequest(text /* , mentionable */) {
    // a simulated async promise
    return new Ember.RSVP.Promise((resolve) => {
      Ember.run.later(this, function() {
        const results = [
          { id: '1', name: `${text} number 1` },
          { id: '2', name: `${text} number 2` },
          { id: '3', name: `${text} number 3` }
        ];
        resolve(results);
      }, 250);
    });
  },
  // END-SNIPPET

  // BEGIN-SNIPPET mentionableConfig6
  customRenderConfig: {
    searchProperty: 'name',
    values: [
      { id: '1', name: 'Annie', image: 'images/user-1.png' },
      { id: '2', name: 'Martin', image: 'images/user-2.png' },
      { id: '3', name: 'Mary', image: 'images/user-3.png' }
    ]
  },
  // END-SNIPPET

  tryItConfig: [
    {
      values: demoUsers
    },
    {
      token: '#',
      values: demoBuzzwords
    }
  ]
});
