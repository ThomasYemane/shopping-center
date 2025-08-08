'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE'
      },

      itemId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Items', key: 'id' },
        onDelete: 'CASCADE'
      },

      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending' // you can change default if needed
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    // Optional indexes for performance
    await queryInterface.addIndex('Orders', ['userId']);
    await queryInterface.addIndex('Orders', ['itemId']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('Orders', ['userId']);
    await queryInterface.removeIndex('Orders', ['itemId']);
    await queryInterface.dropTable('Orders');
  }
};
