var express =require('express');
var app =express();
var port =process.env.PORT || 8000 ;
var bodyParser= require('body-parser');
var cors = require('cors')

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.use((req,res,next)=>{
//     res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Headers","Origin, X-Requested-with,Content-Type, Accept, Authorization");
//     if(req.method ==='OPTIONS'){
//         res.header("Access-Control-Allow-Methods","PUT,POST,PATCH,DELETE,GET");
//         return res.status(200).json({});
//     }
//     next();
// })
app.use('/uploads', express.static('uploads'))
var product_routes= require('./src/routes/products')
app.get('/', function(req, res){
    res.send("Hi iam Tony");
});
app.use('/api/product',product_routes );

app.listen(port, function(){
    console.log("my app running" + 8000)
})