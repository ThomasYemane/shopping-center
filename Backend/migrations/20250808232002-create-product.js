'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      // owner of the product (required)
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE'
      },

      // category can be nullable if you want to allow uncategorized items
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: true, // set to false if you want to require a category
        references: { model: 'Categories', key: 'id' },
        onDelete: 'SET NULL'
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true
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

    // Optional: helpful index for listing/filtering
    await queryInterface.addIndex('Products', ['categoryId']);
    await queryInterface.addIndex('Products', ['userId']);
    await queryInterface.addIndex('Products', ['name']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('Products', ['name']);
    await queryInterface.removeIndex('Products', ['userId']);
    await queryInterface.removeIndex('Products', ['categoryId']);
    await queryInterface.dropTable('Products');
  }
};
