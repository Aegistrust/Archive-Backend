const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cors = require('cors')
const serverless = require ('serverless-http')

const authRoute = require("../routes/users")

const imageRoute = require("../routes/Item/image")
const docsRoute = require("../routes/Item/documents")
const victimRoute = require("../routes/Item/victimImages")
const audioRoute = require("../routes/Item/audios")
const testimonyRoute = require("../routes/Item/testimpny")
const videoRoute = require("../routes/Item/videos")
const visitorsRoute = require("../routes/visitors")
const guestRoute = require("../routes/guests")


app.use(cors())
const router = express.Router();
dotenv.config();

const uri = "mongodb+srv://bhgarsene:Bihogo_30@cluster0.rtsnqrs.mongodb.net/archive?retryWrites=true&w=majority&appName=Cluster0";

async function connectToDb() {
    try {
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 30000, 
      });
      console.log('Successfully connected to MongoDB database "archive"!');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
  }

connectToDb();

app.use(express.json());

app.use('/api/user', authRoute);
app.use('/api/document', docsRoute);
app.use('/api/victimImage', victimRoute);
app.use('/api/image', imageRoute);
app.use('/api/audio', audioRoute);
app.use('/api/testimonyVideo', testimonyRoute);
app.use('/api/video', videoRoute);

app.use('/api/visitors', visitorsRoute);
app.use('/api/guests', guestRoute);
app.get('/', function (req, res) {
    res.sendStatus(204);
});


app.use("/.netlify/functions/app", router);
app.listen(8080, () => console.log('up running server'))
module.exports.handler = serverless(app);