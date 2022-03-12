const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000; //assigning express server to use port 3000

app.use(cors());
app.use(express.json());

//connecting to Mongo Cluster using Mongo Connect API
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.info("MongoDB database connection established successfully");
})

// To add the routes to the Express Server
const travellersRouter = require('./routes/traveller');

app.use('/travellers', travellersRouter);

app.listen(port, () => {
    console.info(`Server is running on port: ${port}`);
});