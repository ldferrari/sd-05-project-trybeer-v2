const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const usersController = require('./controllers/usersController');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const detailsController = require('./controllers/salesProductsController');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use('/users', usersController);

app.use('/products', productsController);

app.use('/checkout', salesController);

app.use('/details', detailsController);

app.use('/images', express.static('images'));

const tresMilUm = 3001;

const PORT = process.env.PORT || tresMilUm;
app.listen(PORT, () => console.log(`Yummy, here is ${PORT} port`));
