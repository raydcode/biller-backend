const express = require('express');
const Customer = require('./controllers/Customer');
const Invoice = require('./controllers/Invoice');

const app = express();


app.use(express.json());




app.get('/', async (req, res) => {
	res.send({
		message: 'Server is up and running....',
		
	})
});




app.use("/api/customer",Customer)
app.use("/api/invoice",Invoice)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
