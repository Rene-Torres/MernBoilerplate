require('dotenv').config();

const express = require('express');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose     = require('mongoose');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require('method-override');
const config = require('./config').get(process.env.NODE_ENV);

const User = require('./models/User');

mongoose.Promise = Promise;
mongoose.connect((config.DATABASE),{useMongoClient: true})

const app = express();




app.use(bodyParser.json());
app.use(cookieParser());

//session
app.use(session({
  secret: "notBliss",
  resave: true,
  saveUninitialized: true
}));

//////////////////////
// Middleware Setup //
//////////////////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



app.use(express.static('client/build'))

//some fake data
app.get('/api',(req, res)=>{
  const somedata =[
    {id:1, firstName : 'Nombre', lastName:'Apellido'},
    {id:2, firstName : 'Otro', lastName:'OtroApellido'},
  ];
  res.json(somedata);
});


app.post('/api',(req,res)=>{
User.create(req.body)
.then(()=>{
  res.send('usuario creado')
})
.catch(err=>console.log('error',err))
})

//data from  local mongo database

app.get('/data',(req,res)=>{
const user = User.find()
.then(user=>{
  console.log(user)
  res.json(user)
})
})

const port = 5000 || process.env.PORT;
app.listen(port,()=>console.log(`Server started on port ${port}`))
