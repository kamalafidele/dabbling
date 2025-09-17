const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

app.use(cors({ origin: '*' }));
app.use(express.json({ extended: true, limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/api/v1', require('./Routes'));

const PORT = 4500 || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));