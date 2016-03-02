var express = require("express"),
    handlebars = require('express3-handlebars').create({"defaultLayout":"main"});

var app = express();
//设置view引擎
app.engine("handlebars", handlebars.engine);
app.set('view engine', 'handlebars');

//设置端口
app.set('port', process.env.PORT || 3000);

//设置public目录
app.use(express.static(__dirname + "/public"));

//root
app.get('/',function(req, res){
    res.render('home');
});

// /about
app.get('/about',function(req, res){
    var fortues = [
        'Conquer your fears or they will Conquer you.',
        'Rivers need spring.',
        'Do not fear with you don\'t know',
        "You will have a pleasant surprise.",
        "Whenever possible, keep it simple"
    ];

    var randomFortune = fortues[Math.floor(Math.random() * fortues.length)]
    res.render('about', {'fortue' : randomFortune});
});
//404 not found
app.use(function(req, res, next){
    res.status(404);
    res.render('404');

});

//定制500y页面
app.use(function(err, req, res, next){
        console.error(err.stack);
        res.status(500);
        res.render('404');
})

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get("port") + '; press Ctrl-C to terminate.');
    // console.info(app);
});
