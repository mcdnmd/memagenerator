const path = require("path");
module.exports = function(app) {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, './index.html'))
    });
    app.get('/style.css', (req, res) => {
        res.sendFile(path.join(__dirname, './style.css'))
    });
};