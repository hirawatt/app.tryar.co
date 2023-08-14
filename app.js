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
const cookieSession = require('cookie-session');

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

app.use(cookieSession({
    name: 'login',
    maxAge: 60 * 60 * 1000 * 24, //time in millisec
    keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

//set up routes
app.use('/api', authRoutes);
app.use('/api', databaseApiRoutes);

app.get('/items', (req, res) => res.redirect(process.env.CLIENT_URI + '/items' || 'https://localhost:3000/items'));
app.get('/', (req, res) => res.redirect(process.env.CLIENT_URI || 'https://localhost:3000'));

//unknown path
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

// listining for port
app.listen(PORT, () => console.log(`TryAR backend running on port ${PORT}....`));