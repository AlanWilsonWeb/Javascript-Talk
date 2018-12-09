const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: 'sequelize.sqlite'
  });
sequelize.authenticate()
  .then(() => {
    console.log('Database Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.set("port", process.env.PORT || 5000)

const Items = sequelize.define('Items', {
    ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
    Name: {
        type: Sequelize.STRING
    },
    Description: {
        type: Sequelize.STRING
    },
    Price: {
        type: Sequelize.INTEGER
    }
  },
  { timestamps: false,
    freezeTableName: true
});

app.get('/test', (req, res) => {
    res.json([
        {id:1, name: "this"},
        {id:2, name: "is"},
        {id:3, name: "a"},
        {id:4, name: "test"}
    ]);
});

app.get('/item', (req, res) => {
    Items.findAll().then(item => {
        res.json(item);
      });
});

app.get('/item2', (req, res) => {
    sequelize.query('SELECT * FROM Items')
  .then(items => {
    res.json(items);
  })
})

app.post('/item', (req, res) => {
    Items.create({ Name: req.body.name, Description: req.body.description, Price: req.body.price })
    .then(
        res.send('Successfully added to Database!')
    );
})

app.post('/item2', (req, res) => {
    sequelize.query(`INSERT INTO Items (Name, Description, Price)
    VALUES( '${req.body.name}', '${req.body.description}', '${req.body.price};')`)
    .then(res.send('Successfully added to Database!'))
})

app.listen(app.get("port"), () => {
    console.log(
      "Express started on http://localhost:" +
        app.get("port") +
        "; press Ctrl-C to terminate."
    );
  });