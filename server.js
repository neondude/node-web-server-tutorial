const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('view-engine','hbs');

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `------\n${now} \n${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n',(err)=>{
        if(err){

            console.log('unable to update server log');
        }
    });
    next();
});


app.use((req,res,next)=>{
    res.render('maintain.hbs');
});

app.use(express.static(__dirname + "/public"));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt' ,(text)=>{
    return text.toUpperCase();
});

app.get('/',(req,res)=>{
    res.render('home.hbs',{

            pageTitle : 'Home Page',
            welcomeMessage : 'welcome to my home'

    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle : 'About Page'
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage : 'unable to handle request'
    });
});
app.listen(port , ()=>{
    console.log(`server is up on port : ${port}`);
});
