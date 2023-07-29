const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;

// listining for port
const server = app.listen(PORT, function () {
    console.log(`TryAR running on port ${PORT}....`);
});