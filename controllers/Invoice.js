const router = require('express').Router();

const { generatePDF } = require('../helpers/pdf');
const { addInvoice, getInvoiceById } = require('../services/Invoice');

router.get('/', async (req, res) => {
	try {
	} catch (error) {
		console.log(error);
	}
});

router.get('/export', async (req, res) => {
    try {
        const result = await getInvoiceById(req.query.invoiceId);
        const {buffer,fileName} = await generatePDF(result);
        res.set({
			'Content-Type': 'application/octet-stream',
			'Content-Disposition': 'attachment; filename=' + fileName,
		});
        res.send(buffer)

	} catch (error) {
		console.log(error);
	}
});

router.post('/', async (req, res) => {
	try {
		return res.status(201).json({
			success: true,
			data: await addInvoice(req.body),
		});
	} catch (error) {
		console.log(error);
	}
});

router.put('/', async (req, res) => {
	try {
	} catch (error) {
		console.log(error);
	}
});

router.delete('/', async (req, res) => {
	try {
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
