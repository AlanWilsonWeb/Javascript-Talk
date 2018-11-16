const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const db = mongoose.connection;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.set("port", process.env.PORT || 5000)

mongoose.connect('mongodb://testuser1:password1@ds161446.mlab.com:61446/peoriatest', function(err) {
    if (err) {
        console.err(err);
    } else {
        console.log('Connected');
    }
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('DB connected!');
});
mongoose.set('bufferCommands', false);
mongoose.set('debug', true);

app.get('/test', (req, res) => {
    res.json([
        {id:1, name: "this"},
        {id:2, name: "is"},
        {id:3, name: "a"},
        {id:4, name: "test"}
    ]);
});

app.listen(app.get("port"), () => {
    console.log(
      "Express started on http://localhost:" +
        app.get("port") +
        "; press Ctrl-C to terminate."
    );
  });