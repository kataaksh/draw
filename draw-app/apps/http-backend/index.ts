import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.json("http backend running")
})

app.listen(8080, () => {
    console.log("Works")
})