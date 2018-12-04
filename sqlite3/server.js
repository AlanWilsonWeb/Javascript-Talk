const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./sqlite3.sqlite', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.set("port", process.env.PORT || 5000)

app.get('/test', (req, res) => {
    res.json([
        {id:1, name: "this"},
        {id:2, name: "is"},
        {id:3, name: "a"},
        {id:4, name: "test"}
    ]);
});

app.get('/item', (req, res) => {
    db.all('SELECT * FROM Items', [], (err, rows) => {
        if (err) {
          throw err;
        }
        res.json(rows);
      });
})

app.post('/item', (req, res) => {
    db.run(`INSERT INTO Items (Name, Description, Price) VALUES( "${req.body.name}", "${req.body.description}", "${req.body.price}")`, [], function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`Inserted Row Successfully!`);
      });
    res.end();
})

app.listen(app.get("port"), () => {
    console.log(
      "Express started on http://localhost:" +
        app.get("port") +
        "; press Ctrl-C to terminate."
    );
  });