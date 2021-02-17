const express = require('express');
const session = require("express-session");
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require("cors");
const User = require("./models/UserModel");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 6000;

//Middleware
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

if (process.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(__dirname, 'client', 'build', 'index.html');
  })
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: "thisisashittysecret",
  resave: true,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


// Datebase
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

const db = mongoose.connection;

db.on("error", console.error.bind(console, `db connection error`));
db.once("open", () => console.log("db connection open"));


//Controlers
const UserControl = require("./controllers/UserController");
const EventControl = require("./controllers/EventController");
const UserEventController = require('./controllers/UserEventController');

// Handles any requests that don't match the ones above
// app.get('*', (req,res) =>{
//   res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });
//Routes
app.post('/cal/addevent', UserEventController.addevent);
app.post("/events", EventControl.query)
app.post('/cal', UserEventController.query);
app.post("/user/register", UserControl.create);
app.post("/user/login", UserControl.login);
app.post("/user/logout", UserControl.logout);
app.post("/cal/deleteevent", UserEventController.deleteevent)
//Start Server
app.listen(port, () => console.log(`server listening on port ${port}`)
);