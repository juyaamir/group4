import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

const app = express();
dotenv.config();
app.use(cors({origin: "*"}));
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send(`Hello from Express!`);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})