'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
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

      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Products', key: 'id' },
        onDelete: 'CASCADE'
      },

      rating: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      comment: {
        type: Sequelize.TEXT,
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

    // OPTIONAL: prevent duplicate reviews per user/product
    await queryInterface.addConstraint('Reviews', {
      fields: ['userId', 'productId'],
      type: 'unique',
      name: 'unique_user_product_review'
    });

    // OPTIONAL: quick lookups
    await queryInterface.addIndex('Reviews', ['productId']);
    await queryInterface.addIndex('Reviews', ['userId']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('Reviews', ['userId']);
    await queryInterface.removeIndex('Reviews', ['productId']);
    await queryInterface.removeConstraint('Reviews', 'unique_user_product_review');
    await queryInterface.dropTable('Reviews');
  }
};
