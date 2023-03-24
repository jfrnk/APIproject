'use strict';


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        address: '123 grove st',
        city: 'fakecity',
        state: 'MA',
        country: 'United States',
        lat: 83.96,
        lng: -100.9,
        name: 'Container House',
        description: 'House made from containers',
        price: 200.98,
        ownerId: 1
      },
      {
        address: '234 user st.',
        city: 'maybury',
        state: 'NM',
        country: 'United States',
        lat: 76.09,
        lng: 182.90,
        name: 'Emirates',
        description: 'THe emirates',
        price: 340.90,
        ownerId: 2
      },
      {
        address: '567 franklin st',
        city: 'askda',
        state: 'Dubai',
        country: 'Dubai',
        lat: 180.98,
        lng: 76.95,
        name: 'United',
        description: 'United hotel group',
        price: 394.98,
        ownerId: 3
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Container House', 'Emirates', 'United'] }
    }, {});
  }
};
