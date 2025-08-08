'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      itemId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Items', key: 'id' },
        onDelete: 'CASCADE'
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE'
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

    // Optional indexes for faster queries
    await queryInterface.addIndex('Carts', ['userId']);
    await queryInterface.addIndex('Carts', ['itemId']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('Carts', ['userId']);
    await queryInterface.removeIndex('Carts', ['itemId']);
    await queryInterface.dropTable('Carts');
  }
};
