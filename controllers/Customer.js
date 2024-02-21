const { getAllCustomers, addCustomer, updateCustomer, deleteCustomer } = require('../services/Customer');

const router = require('express').Router();

router.get('/', async (req, res) => {
	try {
		return res.status(200).json({
            success: true,
            data: await getAllCustomers(),
        });
	} catch (error) {
		console.log(error);
	}
});

router.post('/', async (req, res) => {
	try {
        return res.status(201).json({
            success: true,
            data: await addCustomer(req.body),
        });
	} catch (error) {
		console.log(error);
	}
});

router.put('/', async (req, res) => {
	try {
        return res.status(200).json({
            success: true,
            data: await updateCustomer(req.body),
        });
	} catch (error) {
		console.log(error);
	}
});

router.delete('/', async (req, res) => {
	try {
        return res.status(204).json({
            success: true,
            data: await deleteCustomer(req.body),
        });
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
