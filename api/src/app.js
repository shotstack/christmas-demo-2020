require('dotenv').config();

const express = require('express');
const path = require('path');
const shotstack = require('./handler/shotstack/lib/shotstack');
const edit = require('./handler/shotstack/lib/edit');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + '../../../web')));

app.post('/demo/shotstack', async (req, res) => {
    try {
        const json = await edit.createJson(req.body);
        const render = await shotstack.submit(json);

        res.header("Access-Control-Allow-Origin", "*");
        res.status(201);
        res.send({ status: 'success', message: 'OK', data: render });
    } catch (err) {
        console.log(err);
        res.header("Access-Control-Allow-Origin", "*");
        res.status(400);
        res.send({ status: 'fail', message: 'bad request', data: err });
    }
});

app.get('/demo/shotstack/:renderId', async (req, res) => {
    try {
        const status = await shotstack.status(req.params.renderId);

        res.header("Access-Control-Allow-Origin", "*");
        res.status(200);
        res.send({ status: 'success', message: 'OK', data: status });
    } catch (err) {
        console.log(err);
        res.header("Access-Control-Allow-Origin", "*");
        res.status(400);
        res.send({ status: 'fail', message: 'bad request', data: err });
    }
});

app.listen(3000, () => console.log("Server running...\n\nOpen http://localhost:3000 in your browser\n"));