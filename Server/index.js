const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const graphQLServer = require('./graphql');
const connectDatabase = require('./Database');
const cors = require('cors');
const port = Number(process.env.PORT) || 8000;

app.use(bodyParser.json());
app.use(cors());

connectDatabase();

graphQLServer(app);

app.listen((port) , ()=> {
    console.log(`Backend Server is running at port:${port}`);
});