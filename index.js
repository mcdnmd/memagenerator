import express from 'express'
import path from 'path'

const __dirname = path.resolve();
const PORT = 3333;
const app = express();

app.use(express.static(path.resolve(__dirname, 'static')));


app.listen(PORT, () => {
    console.log(`server started on port ${PORT}!`);
});