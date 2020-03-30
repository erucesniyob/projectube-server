const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8080;

var uri = 'mongodb+srv://dminhdo:dminhdo@cluster0-krnqo.mongodb.net/test?retryWrites=true&w=majority'
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err){
    console.log(err)
  } else{
    console.log('Connected')
  }
}
);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Projectube's server is running on port ${PORT}`)
  }
})
