const express = require('express');
const app = express();

require('./components/mainpage/index')(app);
app.listen(3333, () => {
    console.log('server started!');
});