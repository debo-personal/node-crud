const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

/* Body parser will read the data from form element, 
** The urlencoded method within body-parser tells body-parser to
** extract data from the <form> element and add them to the body property in the request object.
*/
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
var db;

/*
** Connection to mongo dB, on success of that we will start the node server.
*/
MongoClient.connect( 'mongodb://admin:password@ds033956.mlab.com:33956/debo-test-db', ( err, database) => {
	if( err ) {
		return console.error( "Couldn't connect to database. Error: ", err );
	}
	else {
		db = database;
		app.listen( 3000, () => {
			console.log('Node application started at port 3000');
		});
	}
});

/* Default route returns the index template */
app.get('/', (req, res) => {
	db.collection('users').find().toArray(( err, result ) => {
		if( err ) {
			return console.error( err );
		}
		res.render( 'index.ejs', {users : result});
	}
)
});

app.post('/users', (req, res) => {
    db.collection('users').save(req.body, (err, result) => {

  	console.log('saved to database.', req.body );
    if (err) {
    	return console.error(err);	
    } 
    
    res.redirect('/');
  })
})