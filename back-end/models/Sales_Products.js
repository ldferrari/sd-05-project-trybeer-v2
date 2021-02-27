function Sales_Products(sequelize, DataTypes) {
  const sales_products = sequelize.define('sales_products', {
    quantity: { type: DataTypes.INTEGER, allowNull: false },
  },
  { timestamps: false },
  );
  // https://sequelize.org/v5/manual/associations.html#belongs-to-many-associations
  sales_products.associate = (models) => {
    models.sales.belongsToMany(models.products, { as: 'products',
      foreignKey: 'sale_id', otherKey: 'product_id', through: sales_products }
    );

    models.products.belongsToMany(models.sales, { as: 'sales',
      foreignKey: 'product_id', otherKey: 'sale_id', through: sales_products }
    );
  };

  return sales_products;
};

module.exports = Sales_Products;
