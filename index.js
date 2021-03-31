require('dotenv').config();
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const bodyParser = require('body-parser')

const swaggerConfig = require('./config/swagger');
const router = require('./services/router');

const swaggerSpecification = swaggerJsDoc(swaggerConfig);

//middlewares
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecification, { explorer: true }));


// Mount the router at /facturacion/v1 so all routes start with /facturacion/v1
app.use('/facturacion/v1', router);
app.listen(process.env.PORT)



