const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
let app = express();

app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');
app.use(bodyParser.urlencoded({extended : false}));

app.get(['/topic', '/topic/:id'], (req, res) => {
    fs.readdir('data/', (err, files) => {
        let description = new Array();
        if(err){
            res.status(500).send('err');
        }
        let id = req.params.id;
        if(id){
            fs.readFile('data/' + id, 'utf8', (err, data) => {
                if(err){
                    console.log(err);
                    res.status(500).send("err");
                }
                res.render('topic', {topics:files, title: id, description: data});
            })
        }else{
            res.render('topic', {topics : files, title:'Welcome', description:'Hello, JavaScript for server'});
        }
    });
});

app.get('/test', (req, res) => {
    var fileNames = new Array;
    new Promise(function(resolve,reject){
        fs.readdir('data/', (err, files) => {
            fileNames = files;
            return resolve();
        });
    }).then(res=>{
        console.log(fileNames);
        res.render('topic');
    })
})

/*app.get('/topic/:id', (req, res) => {
    let id = req.params.id;
    fs.readFile('data/' + id, (err, data) => {
        if(err){
            console.log(err);
            res.status(500).send("err");
        }
        res.render('topic',{title: id});
    })
})*/

app.get('/regTopic', (req, res) => {
    res.render('regTopic');
});

app.post('/regTopicProc', (req, res) => {
    let title = req.body.title;
    let description = req.body.description;

    fs.writeFile("data/" + title, description, (err) => {
        if(err){
            console.log("err");
            res.status(500).send("error");
        }
        res.redirect("/topic");
    });
});



app.listen(3000, () => {
    console.log("server is started");
});