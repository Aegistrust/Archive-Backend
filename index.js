const express = require('express');
const app =  express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cors = require('cors')
const authRoute = require("./routes/users")

const imageRoute = require("./routes/Item/image")
const docsRoute = require("./routes/Item/documents")
const victimRoute = require("./routes/Item/victimImages")
const audioRoute = require("./routes/Item/audios")
const testimonyRoute = require("./routes/Item/testimpny")
const videoRoute = require("./routes/Item/videos")


const visitorsRoute = require("./routes/visitors")
const guestRoute = require("./routes/guests")
app.use(cors())


dotenv.config();

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DB_CONNECT)
.then( () => console.log("connected to DB."))
.catch( err => console.log(err));

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
app.get('/', function(req, res) {
    res.sendStatus(204);
});


app.listen(8080, () => console.log('up running server'))
