const express = require('express');
const bodyParser = require('body-parser');
let app = express();

app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : false}));

app.get('/form', (req, res) => {
    res.render('form');
});

app.get('/form_receiver', (req, res) => {
    let title = req.query.title;
    let description = req.query.description;
    res.send(title + ", " + description);
});

app.post('/form_receiver', (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    res.send(title + ', ' + description);
})

app.get('/topic', (req, res) => {
    let topics = [
        'java',
        'javascript',
        'react-native'
    ];

    let output = `
    <a href="/topic?id=0">java</a><br>
    <a href="/topic?id=1">javascript</a></br>
    <a href="/topic?id=2">react-native</a></br>
    ${topics[req.query.id]}
    `

    res.send(output);
});

app.get('/topic/:id', (req, res) => {
    let topics = [
        'java',
        'javascript',
        'react-native'
    ];

    let output = `
    <a href="/topic/0">java</a><br>
    <a href="/topic/1">javascript</a></br>
    <a href="/topic/2">react-native</a></br>
    ${topics[req.params.id]}
    `

    res.send(output);
});

app.get('/template', (req, res) => {
    res.render('temp', {time: new Date(), title: 'jade'});
});

app.get('/', (req, res) => {
    res.send('<h1>hello home page</h1>');
});

app.get('/dynamic', (req, res) => {

    let li = "";
    for(let i = 0; i< 5; i++){
        li += "<li>coding</li>";
    }

    let time = new Date();

    let output = `<html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
        hello static
        <ul>
            ${li}
        </ul>
        ${time}
    </body>
</html>`

    res.send(output);
});

app.get('/route', (req, res) => {
    res.send('hello router, <img src="/honey.jpg">')
});

app.get('/login', (req, res) => {
    res.send('Login please');
});

app.listen(3000, () => {
    console.log("server start");
});
