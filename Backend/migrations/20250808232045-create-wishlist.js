'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Wishlists', {
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

    // Prevent duplicate wishlist rows per (user, product)
    await queryInterface.addConstraint('Wishlists', {
      fields: ['userId', 'productId'],
      type: 'unique',
      name: 'unique_user_product_wishlist'
    });

    // Helpful indexes
    await queryInterface.addIndex('Wishlists', ['userId']);
    await queryInterface.addIndex('Wishlists', ['productId']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('Wishlists', ['productId']);
    await queryInterface.removeIndex('Wishlists', ['userId']);
    await queryInterface.removeConstraint('Wishlists', 'unique_user_product_wishlist');
    await queryInterface.dropTable('Wishlists');
  }
};
