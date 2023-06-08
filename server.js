console.log("Server is running");

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { stringify } = require('querystring');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const connectionString = "mongodb+srv://haleelee:ManuGinobili31!@cluster0.rlbic.mongodb.net/?retryWrites=true&w=majority";

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('electrical-data')
    const dataCollection = db.collection('conduit-conductor-1.0')

    app.set('view engine', 'ejs');

    // GET METHOD
    app.get('/', (req, res) => {
      dataCollection.findOne()
    .then(result => {
      res.render('index.ejs', {result});
    })
    .catch(error => console.error(error))
    })

    //POST METHOD FOR CONDUCTORS
    app.post('/data', (req, res) => {
      let array = [];
      let queryProperty = req.body.conductorSelection;
      let max = 2;
      for(let i = 0; i < max; i++){
        dataCollection.findOne(
          { name: queryProperty }
        )
        .then(data => {
          array.push(data);
          // console.log(array);
          if(i === 1) res.send(array);
        })
        .catch(error => console.error(error))
        if(i === 0) queryProperty = req.body.conduitSelection;
      }
    })

    // POST METHOD FOR CONDUIT
    // app.post('/conduit', (req, res) => {
    //   dataCollection.findOne(
    //     { name: req.body.conduitSelection }
    // )
    // .then(data => {
    //   res.send(data);
    // })
    // .catch(error => console.error(error))
    // })

    // GET METHOD FOR TABLES 
    app.get('/tables', (req, res) => {
      dataCollection.findOne()
    .then(result => {
      res.render('tables.ejs', {result});
    })
    .catch(error => console.error(error))
    })



    //POST METHOD FOR TABLES CONDUCTORS
  //   app.post('/tablespost', (req, res) => {
  //     dataCollection.find({ type: req.body.conduitSelection })
  //     .toArray((err, results) => {
  //       if(err) throw err;

  //       results.forEach((value => {
  //         console.log(value);
  //       }))
  //     })
  //   })
  // }) 

      app.post('/tablesConduitPost', (req, res) => {
        const myArray = [];
        dataCollection.find({ type: req.body.conduitSelection }).forEach(doc => {
          myArray.push(doc);
        }, err => {
          if (err) {
            console.error(err);
            return;
          }
          // console.log(myArray); // an array of documents
          res.send(myArray);
        });
      })

      app.post('/tablesConductorPost', (req, res) => {
        const myArray = [];
        dataCollection.find({ material: req.body.conductorSelection.slice(0,2), type: req.body.conductorSelection.substring(2) }).forEach(doc => {
          myArray.push(doc);
        }, err => {
          if (err) {
            console.error(err);
            return;
          }
          // console.log(myArray); // an array of documents
          res.send(myArray);
        });
      })

  }) //end of MongoClient Connect function

  
//LISTEN PORT
app.listen(3000, function() {
    console.log('listening on 3000')
})
