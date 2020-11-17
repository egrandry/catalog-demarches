const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const demarches = require('../routes/api/demarches');

app.use('/api/demarches', demarches);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
