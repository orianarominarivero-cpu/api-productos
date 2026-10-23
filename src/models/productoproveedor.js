'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductoProveedor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductoProveedor.init({
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    proveedorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'ProductoProveedor',
    tableName: 'ProductoProveedores'
  });
  return ProductoProveedor;
};