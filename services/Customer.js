const knex = require('../knexfile');

const getAllCustomers = () => {
  return knex.select('*').from('customers');
};

const getCustomerById = (customerId) => {
  return knex.select('*').from('customers').where('customer_id', customerId);
};

const addCustomer = (customer) => {
  return knex('customers').insert(customer);
};

const updateCustomer = (customerId, updatedInfo) => {
  return knex('customers')
    .where({ customer_id: customerId })
    .update(updatedInfo);
};

const partiallyUpdateCustomer = (customerId, updatedInfo) => {
  return knex('customers')
    .where({ customer_id: customerId })
    .update(updatedInfo);
};

const deleteCustomer = (customerId) => {
  return knex('customers')
    .where({ customer_id: customerId })
    .del();
}

module.exports = {
  getAllCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  partiallyUpdateCustomer,
  deleteCustomer
};
