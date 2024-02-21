const knex = require('../knexfile');

const getAllProducts = () => {
  return knex.select('*').from('products');
};

const getProductById = (productId) => {
  return knex.select('*').from('products').where('product_id', productId);
};

const addProduct = (product) => {
  return knex('products').insert(product);
};

const updateProduct = (productId, updatedInfo) => {
  return knex('products')
    .where({ product_id: productId })
    .update(updatedInfo);
};

const partiallyUpdateProduct = (productId, updatedInfo) => {
  return knex('products')
    .where({ product_id: productId })
    .update(updatedInfo);
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  partiallyUpdateProduct
};
