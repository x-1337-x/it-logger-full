const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

connectDB();

const app = express();

app.use(express.json({ extended: false }));

app.use('/api/techs', require('./routes/techs'));
app.use('/api/logs', require('./routes/logs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
