const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.set('view engine', 'ejs');
var dB;

/*
** Connection to mongo dB, on success of that we will start the node server.
*/
MongoClient.connect( 'mongodb://admin:password@ds033956.mlab.com:33956/debo-test-db', ( err, database) => {
	if( err ) {
		return console.error( "Couldn't connect to database. Error: ", err );
	}
	else {
		app.listen( 3000, () => {
			console.log('Node application started at port 3000');
		});
	}
});

/* Default route returns the index template */
app.get('/', (req, res) => {
	res.render( 'index.ejs' );
});