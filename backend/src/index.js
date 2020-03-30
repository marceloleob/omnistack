const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const app = express();

// online
// app.use(cors({
// 	origin: 'http://meuapp.com'
// }));
app.use(cors());
app.use(express.json());
app.use(routes);

// porta para executar a operacao
app.listen(3333);
