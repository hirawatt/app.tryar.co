const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8000;

require('dotenv').config();

const corsOptions = {
    credentials: true,
    origin: true
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors(corsOptions));

// listining for port
app.listen(PORT, () => console.log(`TryAR running on port ${PORT}....`));