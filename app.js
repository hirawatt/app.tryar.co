const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8000;

require('./model/user');
require('./model/item');
require('dotenv').config();
require('./config/passport-setup');

const keys = require('./config/keys');

const corsOptions = {
    credentials: true,
    origin: true
};

const passport = require('passport');
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//import routes
const authRoutes = require("./routes/auth-routes");
const databaseApiRoutes = require("./routes/database-api-routes");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors(corsOptions));

app.use(passport.initialize());
app.use(passport.session());

//set up routes
app.use('/api', authRoutes);
app.use('/api', databaseApiRoutes);

// listining for port
app.listen(PORT, () => console.log(`TryAR running on port ${PORT}....`));