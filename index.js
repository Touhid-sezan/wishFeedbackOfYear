const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sunbd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 5000;


app.get('/', (req, res) => {
    res.send("BOOM from db it's working working")
})

const client = new MongoClient(uri, { useUnifiedTopology: true}, { useNewUrlParser: true });
client.connect(err => {
  const voteCollection = client.db("publicOpinion").collection("vote");
  
app.post('/addVote', (req, res) => {
    const vote = req.body;
    console.log(vote)
    voteCollection.insertOne(vote)
    .then(result => {
        res.send(result.insertedCount > 0)
    })
})

app.get('/votes', (req, res) => {
    voteCollection.find({})
        .toArray((err, documents) => {
            res.send(documents);
        })
})


});





app.listen(process.env.PORT || port)