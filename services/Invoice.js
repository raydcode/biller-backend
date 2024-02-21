const knex = require('../knexfile');

const getAllInvoices = () => {
	return knex.select('*').from('invoices');
};

const getInvoiceById = (invoiceId) => {
	return knex
		.raw(
			`SELECT invoices.*, 
			(
				SELECT row_to_json(customer_subquery.*) 
				FROM (SELECT * FROM customers WHERE customers.customer_id = invoices.customer_id) AS customer_subquery
			) AS customer,
			(
				SELECT json_agg(row_to_json(invoice_items_subquery.*)) 
				FROM (SELECT *,products.product_name FROM invoice_items inner join products on products.product_id = invoice_items.product_id  WHERE invoice_items.invoice_id = invoices.invoice_id) AS invoice_items_subquery
			) AS items
	 FROM invoices
	 WHERE invoices.invoice_id = ? ;`,
			[invoiceId],
		)
		.then((result) => result.rows[0]);
};

const addInvoice = async ({
	items,
	customerId,
	invoiceDate,
	status = 'Pending',
}) => {
	try {
		const totalAmount = items.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0,
		);
		const [{ invoice_id: invoiceId }] = await knex('invoices')
			.insert({
				customer_id: customerId,
				invoice_date: invoiceDate || new Date(),
				total_amount: totalAmount,
				status: status,
			})
			.returning('invoice_id');

		await knex('invoice_items').insert(
			items.map((item) => ({
				invoice_id: invoiceId,
				product_id: item?.product_id,
				quantity: item?.quantity,
				price: item?.price,
			})),
		);

		return { invoiceId, totalAmount };
	} catch (error) {
		console.log(error);
	}
};

const updateInvoice = (invoiceId, updatedInfo) => {
	return knex('invoices').where({ invoice_id: invoiceId }).update(updatedInfo);
};

const partiallyUpdateInvoice = (invoiceId, updatedInfo) => {
	return knex('invoices').where({ invoice_id: invoiceId }).update(updatedInfo);
};

module.exports = {
	getAllInvoices,
	getInvoiceById,
	addInvoice,
	updateInvoice,
	partiallyUpdateInvoice,
};
