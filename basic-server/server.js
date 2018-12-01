const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

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

app.listen(app.get("port"), () => {
    console.log(
      "Express started on http://localhost:" +
        app.get("port") +
        "; press Ctrl-C to terminate."
    );
  });